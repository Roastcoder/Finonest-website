import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { isAuthenticated } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2,
  Mail,
  User as UserIcon
} from 'lucide-react';

interface User {
  _id: string;
  email: string;
  fullName?: string;
  role: 'superadmin' | 'admin' | 'editor' | 'contributor';
  isActive?: boolean;
  createdAt?: string;
}

const UsersAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'editor' as 'superadmin' | 'admin' | 'editor' | 'contributor',
    isActive: true
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.cms.listUsersAdmin() as { status: string; data: User[] };
      if (res.status === 'ok') {
        setUsers(Array.isArray(res.data) ? res.data : []);
      } else {
        setUsers([]);
      }
    } catch (error: any) {
      console.error('Error loading users:', error);
      setUsers([]);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      fullName: '',
      password: '',
      role: 'editor',
      isActive: true
    });
    setShowDialog(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      fullName: user.fullName || '',
      password: '',
      role: user.role,
      isActive: user.isActive !== false
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      const payload: any = {
        email: formData.email,
        fullName: formData.fullName,
        role: formData.role,
        isActive: formData.isActive
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (editingUser) {
        await api.cms.updateUserAdmin(editingUser._id, payload);
        toast({ title: 'Updated', description: 'User updated successfully' });
      } else {
        if (!formData.password) {
          toast({ variant: 'destructive', title: 'Error', description: 'Password is required for new users' });
          return;
        }
        await api.cms.createUserAdmin(payload);
        toast({ title: 'Created', description: 'User created successfully' });
      }

      setShowDialog(false);
      await loadUsers();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Save failed' });
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Delete user ${email}? This action cannot be undone.`)) return;

    try {
      await api.cms.deleteUserAdmin(id);
      toast({ title: 'Deleted', description: 'User deleted successfully' });
      await loadUsers();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Delete failed' });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'editor':
        return 'bg-green-100 text-green-800';
      case 'contributor':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout title="Users & Roles Management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-muted-foreground">Manage user accounts and roles</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Create User'}</DialogTitle>
            </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    disabled={!!editingUser}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Password {editingUser && '(leave empty to keep current)'}
                  </label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? 'New password (optional)' : 'Password'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">Active</label>
                </div>
                <Button onClick={handleSave} className="w-full">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </div>
          </DialogContent>
        </Dialog>
      </div>

        <div className="grid gap-4">
          {!Array.isArray(users) || users.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
              <p className="text-muted-foreground">Create your first user to get started.</p>
            </Card>
          ) : (
            Array.isArray(users) && users.map((user) => (
              <Card key={user._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.fullName || user.email}</h3>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                        {user.isActive === false && (
                          <Badge variant="outline" className="text-red-600">Inactive</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      {user.createdAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user.role !== 'superadmin' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(user._id, user.email)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
