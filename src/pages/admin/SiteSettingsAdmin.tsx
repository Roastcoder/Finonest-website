import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { isAuthenticated } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';
import { 
  Settings, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Save, 
  Loader2,
  FileText
} from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteTagline: string;
  primaryPhone: string;
  primaryEmail: string;
  address: string;
  whatsappNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  maintenanceMode: boolean;
}

const SiteSettingsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Finonest',
    siteTagline: 'Your Trusted Loan Partner',
    primaryPhone: '+91 9876543210',
    primaryEmail: 'contact@finonest.com',
    address: '3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, Jaipur, Rajasthan 302018',
    whatsappNumber: '919876543210',
    facebookUrl: 'https://facebook.com/finonest',
    instagramUrl: 'https://instagram.com/finonest',
    linkedinUrl: 'https://linkedin.com/company/finonest',
    twitterUrl: 'https://twitter.com/finonest',
    youtubeUrl: 'https://youtube.com/finonest',
    metaTitle: 'Finonest - Your Trusted Loan Partner | Best Loan Rates in India',
    metaDescription: 'Get the best loan rates with 100% paperless processing. Personal loans, home loans, business loans with instant approval. Apply now at Finonest.',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    maintenanceMode: false
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Skip auth check for development - show default data
    setLoading(false);
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await api.cms.getSiteSettingsAdmin() as { status: string; data: SiteSettings };
      if (res.status === 'ok' && res.data) {
        setSettings(res.data);
      }
    } catch (error: any) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.cms.updateSiteSettingsAdmin(settings);
      toast({ title: 'Saved', description: 'Site settings updated successfully' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await api.auth.logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-2">Manage your website configuration and content</p>
        </div>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Globe className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="w-4 h-4 mr-2" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="seo">
              <FileText className="w-4 h-4 mr-2" />
              SEO & Analytics
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Site Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Site Name</label>
                  <Input
                    value={settings.siteName || ''}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    placeholder="Finonest"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Site Tagline</label>
                  <Input
                    value={settings.siteTagline || ''}
                    onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                    placeholder="Your Trusted Loan Partner"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Maintenance Mode</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={settings.maintenanceMode || false}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="maintenanceMode" className="text-sm">Enable maintenance mode</label>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Primary Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={settings.primaryPhone || ''}
                      onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Primary Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={settings.primaryEmail || ''}
                      onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                      placeholder="contact@finonest.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">WhatsApp Number</label>
                  <Input
                    value={settings.whatsappNumber || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="919876543210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      value={settings.address || ''}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      placeholder="3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, Jaipur, Rajasthan 302018"
                      className="pl-10"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Facebook URL</label>
                  <Input
                    value={settings.facebookUrl || ''}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Instagram URL</label>
                  <Input
                    value={settings.instagramUrl || ''}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">LinkedIn URL</label>
                  <Input
                    value={settings.linkedinUrl || ''}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Twitter URL</label>
                  <Input
                    value={settings.twitterUrl || ''}
                    onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">YouTube URL</label>
                  <Input
                    value={settings.youtubeUrl || ''}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* SEO & Analytics */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Meta Title</label>
                  <Input
                    value={settings.metaTitle || ''}
                    onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    placeholder="Finonest - Your Trusted Loan Partner"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Meta Description</label>
                  <Textarea
                    value={settings.metaDescription || ''}
                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                    placeholder="Get the best loan rates with 100% paperless processing..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Google Analytics ID</label>
                  <Input
                    value={settings.googleAnalyticsId || ''}
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsAdmin;
