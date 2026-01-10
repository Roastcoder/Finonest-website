import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import MediaPicker from '../../components/MediaPicker';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featureImage, setFeatureImage] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = (await api.cms.listPostsAdmin()) as { data?: Post[] };
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (e: unknown) {
      console.error('Error loading posts:', e);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setFeatureImage(null);
  };

  const startEdit = async (id: string) => {
    setLoading(true);
    try {
      const res = (await api.cms.getPostAdmin(id)) as { data?: any };
      const p = res.data;
      setEditing(p);
      setTitle(p.title);
      setSlug(p.slug);
      setExcerpt(p.excerpt || '');
      setFeatureImage(p.featureImage || null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load post' });
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      if (editing) {
        await api.cms.updatePostAdmin(editing.id, { title, slug, excerpt, featureImage });
        toast({ title: 'Updated', description: 'Post updated' });
      } else {
        await api.cms.createPostAdmin({ title, slug, excerpt, featureImage });
        toast({ title: 'Created', description: 'Post created' });
      }
      await loadPosts();
    } catch (e: unknown) {
      toast({ variant: 'destructive', title: 'Error', description: (e as Error).message || 'Save failed' });
    }
  };

  const publish = async (id: string) => {
    try {
      await api.cms.publishPostAdmin(id);
      toast({ title: 'Published' });
      await loadPosts();
    } catch (e: unknown) {
      toast({ variant: 'destructive', title: 'Publish Failed', description: (e as Error).message || 'Publish failed' });
    }
  };

  return (
    <AdminLayout title="Blog Posts Management">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <div>
          <Button onClick={startCreate}>Create Post</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((p) => (
              <Card key={p.id} className="p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">/{p.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(p.id)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => publish(p.id)}>Publish</Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={async () => {
                      if (!confirm('Delete this post?')) return;
                      try {
                        await api.cms.deletePostAdmin(p.id);
                        toast({ title: 'Deleted', description: 'Post deleted' });
                        await loadPosts();
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
              <h3 className="text-lg font-semibold mb-2">No Blog Posts</h3>
              <p className="text-muted-foreground">Create your first blog post to get started.</p>
            </Card>
          )}
        </div>

        <div className="col-span-1">
          <Card className="p-4">
            <div className="space-y-3">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <Textarea placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />

              <div>
                <h4 className="text-sm font-medium mb-2">Feature Image</h4>
                {featureImage ? (
                  <img src={featureImage} alt="feature" className="w-full h-32 object-cover mb-2" />
                ) : (
                  <div className="text-sm text-muted-foreground mb-2">No image selected</div>
                )}
                <MediaPicker onSelect={(m) => setFeatureImage(m.url)} />
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

export default BlogAdmin;
