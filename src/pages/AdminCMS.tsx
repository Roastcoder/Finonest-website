import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { 
  Layout, 
  Blocks, 
  Type, 
  Palette, 
  Image, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Home,
  LogOut,
  Shield,
  Loader2
} from 'lucide-react';

interface PageData {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
}

interface ComponentData {
  id: string;
  component_type: string;
  component_data: Record<string, unknown>;
  order_index: number;
}

const AdminCMS = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pages');
  
  // CMS State - using stub data since CMS tables don't exist
  const [pages, setPages] = useState<PageData[]>([]);
  const [pageComponents, setPageComponents] = useState<ComponentData[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  
  // Dialog states
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [showComponentDialog, setShowComponentDialog] = useState(false);
  
  // Form states
  const [newPageData, setNewPageData] = useState({ slug: '', title: '', meta_description: '' });
  const [newComponentData, setNewComponentData] = useState({ type: '', data: {} });
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
        
      if (data) {
        setIsAdmin(true);
      } else {
        navigate('/dashboard');
      }
    } catch {
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    // Note: CMS tables don't exist in database yet
    // This is a stub implementation
    const newPage: PageData = {
      id: Date.now().toString(),
      ...newPageData
    };
    
    setPages(prev => [newPage, ...prev]);
    setShowPageDialog(false);
    setNewPageData({ slug: '', title: '', meta_description: '' });
    toast({ title: 'Page created (demo mode - CMS tables not configured)' });
  };

  const handleCreateComponent = async () => {
    if (!selectedPage) return;
    
    const componentTemplates: Record<string, Record<string, unknown>> = {
      hero: {
        title: 'Welcome to Our Platform',
        subtitle: 'Your success is our mission',
        backgroundImage: '',
        ctaText: 'Get Started',
        ctaLink: '/apply'
      },
      services: {
        title: 'Our Services',
        services: [
          { title: 'Personal Loans', description: 'Quick and easy personal loans', icon: 'user' },
          { title: 'Home Loans', description: 'Affordable home financing', icon: 'home' }
        ]
      },
      testimonials: {
        title: 'What Our Customers Say',
        testimonials: [
          { name: 'John Doe', text: 'Excellent service!', rating: 5 }
        ]
      }
    };

    const newComponent: ComponentData = {
      id: Date.now().toString(),
      component_type: newComponentData.type,
      component_data: componentTemplates[newComponentData.type] || {},
      order_index: pageComponents.length
    };
    
    setPageComponents(prev => [...prev, newComponent]);
    setShowComponentDialog(false);
    setNewComponentData({ type: '', data: {} });
    toast({ title: 'Component added (demo mode - CMS tables not configured)' });
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploadingMedia(true);
    // Note: Media library table doesn't exist
    toast({ title: 'Media upload not available - CMS tables not configured' });
    setUploadingMedia(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Admin CMS</h1>
            <Badge variant="secondary">Content Management</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" onClick={() => window.open('/', '_blank')}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg mb-6">
          <strong>Note:</strong> CMS tables are not yet configured in the database. This is a demo interface.
          The actual CMS functionality requires creating the necessary database tables.
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Blocks className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Pages Management */}
          <TabsContent value="pages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Pages Management</h2>
              <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Page
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Page</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Slug</label>
                      <Input
                        value={newPageData.slug}
                        onChange={(e) => setNewPageData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="page-url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newPageData.title}
                        onChange={(e) => setNewPageData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Page Title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Meta Description</label>
                      <Textarea
                        value={newPageData.meta_description}
                        onChange={(e) => setNewPageData(prev => ({ ...prev, meta_description: e.target.value }))}
                        placeholder="SEO description"
                      />
                    </div>
                    <Button onClick={handleCreatePage} className="w-full">
                      Create Page
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {pages.length === 0 ? (
                <Card className="p-8 text-center">
                  <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pages Yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first page to get started.</p>
                </Card>
              ) : (
                pages.map((page) => (
                  <Card key={page.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{page.title}</h3>
                        <p className="text-sm text-muted-foreground">/{page.slug}</p>
                        <p className="text-sm text-muted-foreground mt-1">{page.meta_description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPage(page);
                            setActiveTab('components');
                          }}
                        >
                          <Blocks className="w-4 h-4 mr-1" />
                          Components
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Components Management */}
          <TabsContent value="components" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Page Components</h2>
              {selectedPage && (
                <Dialog open={showComponentDialog} onOpenChange={setShowComponentDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Component
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Component to {selectedPage.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={newComponentData.type} onValueChange={(value) => setNewComponentData(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select component type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero Section</SelectItem>
                          <SelectItem value="services">Services Grid</SelectItem>
                          <SelectItem value="testimonials">Testimonials</SelectItem>
                          <SelectItem value="contact">Contact Form</SelectItem>
                          <SelectItem value="stats">Statistics</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleCreateComponent} className="w-full">
                        Add Component
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {selectedPage ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold">Editing: {selectedPage.title}</h3>
                  <p className="text-sm text-muted-foreground">/{selectedPage.slug}</p>
                </div>
                
                {pageComponents.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Blocks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Components</h3>
                    <p className="text-muted-foreground mb-4">Add components to build your page.</p>
                  </Card>
                ) : (
                  pageComponents.map((component) => (
                    <Card key={component.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold capitalize">{component.component_type}</h4>
                          <p className="text-sm text-muted-foreground">Order: {component.order_index}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Page</h3>
                <p className="text-muted-foreground">Go to Pages tab and select a page to manage its components.</p>
              </Card>
            )}
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="p-8 text-center">
              <Type className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Content Blocks</h3>
              <p className="text-muted-foreground">CMS tables not configured. Create database tables to enable content management.</p>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6">
            <Card className="p-8 text-center">
              <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Theme Settings</h3>
              <p className="text-muted-foreground">CMS tables not configured. Create database tables to enable theme customization.</p>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Library</h2>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleMediaUpload}
                  disabled={uploadingMedia}
                />
                <Button disabled={uploadingMedia}>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingMedia ? 'Uploading...' : 'Upload'}
                </Button>
              </label>
            </div>
            <Card className="p-8 text-center">
              <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Media Files</h3>
              <p className="text-muted-foreground">CMS tables not configured. Create database tables to enable media management.</p>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-8 text-center">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">CMS Settings</h3>
              <p className="text-muted-foreground">Configure your CMS settings here once database tables are created.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* User info */}
      {user && (
        <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg px-3 py-2 text-sm">
          Logged in as: {user.email}
        </div>
      )}
    </div>
  );
};

export default AdminCMS;
