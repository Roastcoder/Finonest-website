import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
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
  Eye, 
  Save, 
  Upload,
  ToggleLeft,
  ToggleRight,
  Move,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  Home,
  LogOut,
  Shield,
  Loader2
} from 'lucide-react';

const AdminCMS = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pages');
  
  // CMS State
  const [pages, setPages] = useState([]);
  const [pageComponents, setPageComponents] = useState([]);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [themeSettings, setThemeSettings] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  
  // Dialog states
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [showComponentDialog, setShowComponentDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  
  // Form states
  const [newPageData, setNewPageData] = useState({ slug: '', title: '', meta_description: '' });
  const [newComponentData, setNewComponentData] = useState({ type: '', data: {} });
  const [newContentData, setNewContentData] = useState({ key: '', title: '', content: '', type: 'text' });
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
        await fetchCMSData();
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const fetchCMSData = async () => {
    try {
      const [pagesRes, contentRes, themeRes, mediaRes] = await Promise.all([
        supabase.from('pages').select('*').order('created_at', { ascending: false }),
        supabase.from('content_blocks').select('*').order('key'),
        supabase.from('theme_settings').select('*').order('category'),
        supabase.from('media_library').select('*').order('created_at', { ascending: false })
      ]);

      if (pagesRes.data) setPages(pagesRes.data);
      if (contentRes.data) setContentBlocks(contentRes.data);
      if (themeRes.data) setThemeSettings(themeRes.data);
      if (mediaRes.data) setMediaFiles(mediaRes.data);
    } catch (error) {
      console.error('Error fetching CMS data:', error);
    }
  };

  const fetchPageComponents = async (pageId) => {
    try {
      const { data } = await supabase
        .from('page_components')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index');
      if (data) setPageComponents(data);
    } catch (error) {
      console.error('Error fetching page components:', error);
    }
  };

  const handleCreatePage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert(newPageData)
        .select()
        .single();
      
      if (error) throw error;
      
      setPages(prev => [data, ...prev]);
      setShowPageDialog(false);
      setNewPageData({ slug: '', title: '', meta_description: '' });
      toast({ title: 'Page created successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleCreateComponent = async () => {
    if (!selectedPage) return;
    
    try {
      const componentTemplates = {
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

      const { data, error } = await supabase
        .from('page_components')
        .insert({
          page_id: selectedPage.id,
          component_type: newComponentData.type,
          component_data: componentTemplates[newComponentData.type] || {},
          order_index: pageComponents.length
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setPageComponents(prev => [...prev, data]);
      setShowComponentDialog(false);
      setNewComponentData({ type: '', data: {} });
      toast({ title: 'Component added successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleCreateContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .insert({
          key: newContentData.key,
          title: newContentData.title,
          content: { text: newContentData.content },
          content_type: newContentData.type
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setContentBlocks(prev => [data, ...prev]);
      setShowContentDialog(false);
      setNewContentData({ key: '', title: '', content: '', type: 'text' });
      toast({ title: 'Content block created successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploadingMedia(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data, error } = await supabase
        .from('media_library')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          alt_text: ''
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setMediaFiles(prev => [data, ...prev]);
      toast({ title: 'File uploaded successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleUpdateTheme = async (key, value) => {
    try {
      const { error } = await supabase
        .from('theme_settings')
        .upsert({ key, value: { value } })
        .select();
      
      if (error) throw error;
      
      setThemeSettings(prev => 
        prev.map(setting => 
          setting.key === key ? { ...setting, value: { value } } : setting
        )
      );
      toast({ title: 'Theme updated successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
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
              {pages.map((page) => (
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
                          fetchPageComponents(page.id);
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
              ))}
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
                
                {pageComponents.map((component, index) => (
                  <Card key={component.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium capitalize">{component.component_type}</h4>
                        <p className="text-sm text-muted-foreground">Order: {component.order_index}</p>
                        <Badge variant={component.is_visible ? "default" : "secondary"} className="mt-2">
                          {component.is_visible ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Move className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {component.is_visible ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Blocks className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Page</h3>
                <p className="text-muted-foreground">Choose a page from the Pages tab to manage its components.</p>
              </div>
            )}
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Blocks</h2>
              <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Content
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Content Block</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Key</label>
                      <Input
                        value={newContentData.key}
                        onChange={(e) => setNewContentData(prev => ({ ...prev, key: e.target.value }))}
                        placeholder="unique_key"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newContentData.title}
                        onChange={(e) => setNewContentData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Content Title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select value={newContentData.type} onValueChange={(value) => setNewContentData(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        value={newContentData.content}
                        onChange={(e) => setNewContentData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Content text"
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleCreateContent} className="w-full">
                      Create Content Block
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {contentBlocks.map((content) => (
                <Card key={content.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{content.title}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{content.key}</p>
                      <Badge variant="outline" className="mt-2">{content.content_type}</Badge>
                      <p className="text-sm mt-2 line-clamp-2">{content.content?.text}</p>
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
              ))}
            </div>
          </TabsContent>

          {/* Theme Management */}
          <TabsContent value="theme" className="space-y-6">
            <h2 className="text-2xl font-bold">Theme Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {themeSettings.filter(s => s.category === 'colors').map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <label className="text-sm font-medium capitalize">
                        {setting.key.replace('_', ' ')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={setting.value?.value || '#000000'}
                          onChange={(e) => handleUpdateTheme(setting.key, e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                        <Input
                          value={setting.value?.value || ''}
                          onChange={(e) => handleUpdateTheme(setting.key, e.target.value)}
                          className="w-24"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {themeSettings.filter(s => s.category === 'typography').map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <label className="text-sm font-medium capitalize">
                        {setting.key.replace('_', ' ')}
                      </label>
                      <Input
                        value={setting.value?.value || ''}
                        onChange={(e) => handleUpdateTheme(setting.key, e.target.value)}
                        className="w-32"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Monitor className="w-4 h-4 mr-2" />
                    Desktop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tablet className="w-4 h-4 mr-2" />
                    Tablet
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Mobile
                  </Button>
                </div>
                <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Theme preview will be shown here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Library</h2>
              <div className="flex gap-2">
                <input
                  type="file"
                  id="media-upload"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                />
                <Button asChild disabled={uploadingMedia}>
                  <label htmlFor="media-upload" className="cursor-pointer">
                    {uploadingMedia ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload Media
                  </label>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mediaFiles.map((file) => (
                <Card key={file.id} className="p-2">
                  <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    {file.mime_type?.startsWith('image/') ? (
                      <img
                        src={supabase.storage.from('media').getPublicUrl(file.file_path).data.publicUrl}
                        alt={file.alt_text || file.original_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Image className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs font-medium truncate">{file.original_name}</p>
                  <p className="text-xs text-muted-foreground">{Math.round(file.file_size / 1024)}KB</p>
                  <div className="flex gap-1 mt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Admin Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Logged in as: {user?.email}</p>
                <p className="text-sm text-muted-foreground">Role: Administrator</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={fetchCMSData}>
                    Refresh Data
                  </Button>
                  <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                    View Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminCMS;