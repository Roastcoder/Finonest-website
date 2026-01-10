import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { isAuthenticated } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface Lead {
  _id: string;
  formRef?: { name?: string; slug?: string };
  customer?: { name?: string; email?: string; phone?: string };
  data: Record<string, any>;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'approved' | 'rejected';
  loanType?: string;
  loanAmount?: number;
  applicationNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

const LeadsAdmin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formFilter, setFormFilter] = useState<string>('all');
  const [editingStatus, setEditingStatus] = useState<string>('');

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadLeads();
  }, [navigate]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, formFilter]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const res = await api.cms.listLeadsAdmin() as { status: string; data: Lead[] };
      if (res.status === 'ok') {
        setLeads(Array.isArray(res.data) ? res.data : []);
      } else {
        setLeads([]);
      }
    } catch (error: any) {
      console.error('Error loading leads:', error);
      setLeads([]);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to load leads' });
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => {
        const name = lead.customer?.name || '';
        const email = lead.customer?.email || '';
        const phone = lead.customer?.phone || '';
        const appNumber = lead.applicationNumber || '';
        const loanType = lead.loanType || '';
        return (
          name.toLowerCase().includes(term) ||
          email.toLowerCase().includes(term) ||
          phone.includes(term) ||
          appNumber.includes(term) ||
          loanType.toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (formFilter !== 'all') {
      filtered = filtered.filter(lead => lead.formRef?.slug === formFilter);
    }

    setFilteredLeads(filtered);
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      await api.cms.updateLeadAdmin(leadId, { status: newStatus });
      toast({ title: 'Updated', description: 'Lead status updated successfully' });
      await loadLeads();
      setSelectedLead(null);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to update status' });
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await api.cms.exportLeadsCSVAdmin() as { status: string; data?: { url?: string } };
      if (res.data?.url) {
        window.open(res.data.url, '_blank');
        toast({ title: 'Exported', description: 'Leads exported successfully' });
      } else {
        // Fallback: Generate CSV client-side
        const csv = generateCSV(filteredLeads);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast({ title: 'Exported', description: 'Leads exported successfully' });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Export failed' });
    }
  };

  const generateCSV = (leads: Lead[]): string => {
    const headers = ['Application Number', 'Name', 'Email', 'Phone', 'Loan Type', 'Loan Amount', 'Status', 'Date'];
    const rows = leads.map(lead => [
      lead.applicationNumber || '',
      lead.customer?.name || '',
      lead.customer?.email || '',
      lead.customer?.phone || '',
      lead.loanType || '',
      lead.loanAmount?.toString() || '',
      lead.status,
      new Date(lead.createdAt).toLocaleDateString()
    ]);
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'qualified':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'contacted':
        return <Phone className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'qualified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const handleLogout = async () => {
    await api.auth.logout();
    navigate('/');
  };

  const uniqueForms = Array.from(new Set(leads.map(l => l.formRef?.slug).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout title="Leads Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Forms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {uniqueForms.map(form => (
                  <SelectItem key={form} value={form}>{form}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={loadLeads}>
              <Filter className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-2xl font-bold">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{leads.filter(l => l.status === 'new').length}</div>
            <div className="text-sm text-muted-foreground">New</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{leads.filter(l => l.status === 'contacted').length}</div>
            <div className="text-sm text-muted-foreground">Contacted</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{leads.filter(l => l.status === 'qualified').length}</div>
            <div className="text-sm text-muted-foreground">Qualified</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'approved').length}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">{leads.filter(l => l.status === 'rejected').length}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </Card>
        </div>

        {/* Leads List */}
        <div className="grid gap-4">
          {filteredLeads.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Leads Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || formFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'No leads have been submitted yet.'}
              </p>
            </Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {lead.applicationNumber && (
                        <Badge variant="outline" className="font-mono">
                          #{lead.applicationNumber}
                        </Badge>
                      )}
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusIcon(lead.status)}
                        <span className="ml-1 capitalize">{lead.status}</span>
                      </Badge>
                      {lead.loanType && (
                        <Badge variant="secondary">{lead.loanType}</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      {lead.customer?.name && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{lead.customer.name}</span>
                        </div>
                      )}
                      {lead.customer?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{lead.customer.email}</span>
                        </div>
                      )}
                      {lead.customer?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{lead.customer.phone}</span>
                        </div>
                      )}
                    </div>
                    {lead.loanAmount && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Loan Amount: </span>
                        ₹{lead.loanAmount.toLocaleString('en-IN')}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setEditingStatus(lead.status);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setEditingStatus(lead.status);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      {/* Lead Detail/Edit Dialog */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Lead Details {selectedLead.applicationNumber && `#${selectedLead.applicationNumber}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={editingStatus} onValueChange={setEditingStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="mt-2 w-full"
                  onClick={() => handleStatusUpdate(selectedLead._id, editingStatus)}
                >
                  Update Status
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <div className="p-2 bg-muted rounded">{selectedLead.customer?.name || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <div className="p-2 bg-muted rounded">{selectedLead.customer?.email || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <div className="p-2 bg-muted rounded">{selectedLead.customer?.phone || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Loan Type</label>
                  <div className="p-2 bg-muted rounded">{selectedLead.loanType || 'N/A'}</div>
                </div>
                {selectedLead.loanAmount && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Loan Amount</label>
                    <div className="p-2 bg-muted rounded">₹{selectedLead.loanAmount.toLocaleString('en-IN')}</div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Form Data</label>
                <div className="p-4 bg-muted rounded max-h-60 overflow-y-auto">
                  <pre className="text-xs">{JSON.stringify(selectedLead.data, null, 2)}</pre>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>
    </AdminLayout>
  );
};

export default LeadsAdmin;
