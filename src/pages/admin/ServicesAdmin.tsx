import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import MediaPicker from '../../components/MediaPicker';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';

interface Service {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
}

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) return <div>Loading...</div>;

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = (await api.cms.listServicesAdmin()) as { data?: Service[] };
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (e: unknown) {
      console.error('Error loading services:', e);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setIcon(null);
  };

  const startEdit = async (id: string) => {
    setLoading(true);
    try {
      const res = (await api.cms.getServiceAdmin(id)) as { data?: Service };
      if (!res.data) {
        toast({ variant: 'destructive', title: 'Error', description: 'Service not found' });
        return;
      }
      const s = res.data;
      setEditing(s);
      setTitle(s.title);
      setSlug(s.slug);
      setDescription(s.description || '');
      setIcon(s.icon || null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load service' });
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      if (editing) {
        await api.cms.updateServiceAdmin(editing.id, { title, slug, description, icon });
        toast({ title: 'Updated', description: 'Service updated' });
      } else {
        await api.cms.createServiceAdmin({ title, slug, description, icon });
        toast({ title: 'Created', description: 'Service created' });
      }
      await loadServices();
    } catch (e: unknown) {
      toast({ variant: 'destructive', title: 'Error', description: (e as Error).message || 'Save failed' });
    }
  };

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Services</h2>
          <div>
            <Button onClick={startCreate}>Create Service</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {Array.isArray(services) && services.length > 0 ? (
              services.map((s) => (
                <Card key={s.id} className="p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">/{s.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEdit(s.id)}>Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600" onClick={async () => {
                        if (!confirm('Delete this service?')) return;
                        try {
                          await api.cms.deleteServiceAdmin(s.id);
                          toast({ title: 'Deleted', description: 'Service deleted' });
                          await loadServices();
                        } catch (e: unknown) {
                          toast({ variant: 'destructive', title: 'Delete Failed', description: (e as Error).message || 'Could not delete' });
                        }
                      }}>Delete</Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No Services</h3>
                <p className="text-muted-foreground">Create your first service to get started.</p>
              </Card>
            )}
          </div>

        <div className="col-span-1">
          <Card className="p-4">
            <div className="space-y-3">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <Textarea placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />

              <div>
                <h4 className="text-sm font-medium mb-2">Icon / Image</h4>
                {icon ? (
                  <img src={icon} alt="icon" className="w-full h-32 object-cover mb-2" />
                ) : (
                  <div className="text-sm text-muted-foreground mb-2">No icon selected</div>
                )}
                <MediaPicker onSelect={(m) => setIcon(m.url)} />
              </div>

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

export default ServicesAdmin;
