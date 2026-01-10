import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import AdminLayout from '../../components/AdminLayout';
import { 
  Type, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  Settings,
  FileText,
  Users
} from 'lucide-react';

interface Form {
  _id: string;
  name: string;
  type: string;
  status: string;
  submissions: number;
  createdAt: string;
  fields: number;
}

const FormsAdminNew = () => {
  const [forms] = useState<Form[]>([
    {
      _id: '1',
      name: 'Loan Application Form',
      type: 'Application',
      status: 'active',
      submissions: 245,
      createdAt: '2024-01-15',
      fields: 12
    },
    {
      _id: '2',
      name: 'Contact Us Form',
      type: 'Contact',
      status: 'active',
      submissions: 189,
      createdAt: '2024-01-20',
      fields: 6
    },
    {
      _id: '3',
      name: 'Newsletter Signup',
      type: 'Subscription',
      status: 'active',
      submissions: 456,
      createdAt: '2024-02-01',
      fields: 3
    },
    {
      _id: '4',
      name: 'Feedback Form',
      type: 'Feedback',
      status: 'inactive',
      submissions: 78,
      createdAt: '2024-02-10',
      fields: 8
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || form.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  };

  const types = [...new Set(forms.map(f => f.type))];

  return (
    <AdminLayout title="Forms">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
            <p className="text-gray-600 mt-1">Manage contact forms and lead generation</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Form
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Forms</p>
                <p className="text-3xl font-bold text-gray-900">{forms.length}</p>
              </div>
              <Type className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-3xl font-bold text-gray-900">{forms.filter(f => f.status === 'active').length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900">{forms.reduce((sum, f) => sum + f.submissions, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Form Types</p>
                <p className="text-3xl font-bold text-gray-900">{types.length}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <Card key={form._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getStatusBadgeColor(form.status)}>
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{form.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{form.type}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Submissions:</span>
                    <span className="font-medium text-gray-900">{form.submissions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fields:</span>
                    <span className="font-medium text-gray-900">{form.fields}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium text-gray-900">{form.createdAt}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredForms.length === 0 && (
          <Card className="p-12 text-center">
            <Type className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new form.</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default FormsAdminNew;