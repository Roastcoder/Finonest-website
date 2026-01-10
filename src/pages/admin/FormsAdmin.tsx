import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';

interface FormConfig {
  id: string;
  name: string;
  slug: string;
  config: Record<string, unknown>;
}

const FormsAdmin = () => {
  const [forms, setForms] = useState<FormConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<FormConfig | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [config, setConfig] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    loadForms();
  }, []);

  if (loading) return <div>Loading...</div>;

  const loadForms = async () => {
    setLoading(true);
    try {
      const res = (await api.cms.listFormsAdmin()) as { data?: FormConfig[] };
      setForms(Array.isArray(res.data) ? res.data : []);
    } catch (e: unknown) {
      console.error('Error loading forms:', e);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setName('');
    setSlug('');
    setConfig('');
  };

  const startEdit = async (id: string) => {
    setLoading(true);
    try {
      const res = (await api.cms.getFormAdmin(id)) as { data?: FormConfig };
      if (!res.data) {
        toast({ variant: 'destructive', title: 'Error', description: 'Form not found' });
        return;
      }
      const f = res.data;
      setEditing(f);
      setName(f.name);
      setSlug(f.slug);
      setConfig(JSON.stringify(f.config || {}, null, 2));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load form' });
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      const parsed = JSON.parse(config || '{}');
      if (editing) {
        await api.cms.updateFormAdmin(editing.id, { name, slug, config: parsed });
        toast({ title: 'Updated', description: 'Form updated' });
      } else {
        await api.cms.createFormAdmin({ name, slug, config: parsed });
        toast({ title: 'Created', description: 'Form created' });
      }
      await loadForms();
    } catch (e: unknown) {
      toast({ variant: 'destructive', title: 'Error', description: (e as Error).message || 'Save failed' });
    }
  };

  return (
    <AdminLayout title="Forms Management">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Forms</h2>
        <div>
          <Button onClick={startCreate}>Create Form</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {Array.isArray(forms) && forms.length > 0 ? (
            forms.map((f) => (
              <Card key={f.id} className="p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{f.name}</h3>
                    <p className="text-sm text-muted-foreground">/{f.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(f.id)}>Edit</Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No Forms</h3>
              <p className="text-muted-foreground">Create your first form to get started.</p>
            </Card>
          )}
        </div>

        <div className="col-span-1">
          <Card className="p-4">
            <div className="space-y-3">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <Textarea placeholder="Config (JSON)" value={config} onChange={(e) => setConfig(e.target.value)} />

              <div className="flex gap-2">
                <Button onClick={save}>Save</Button>
                <Button variant="outline" onClick={startCreate}>New</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default FormsAdmin;
