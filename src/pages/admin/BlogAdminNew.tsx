import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import AdminLayout from '../../components/AdminLayout';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  status: string;
  category: string;
  publishedAt: string;
  views: number;
  excerpt: string;
}

const BlogAdminNew = () => {
  const [posts] = useState<BlogPost[]>([
    {
      _id: '1',
      title: 'How to Get the Best Home Loan Rates in 2024',
      slug: 'best-home-loan-rates-2024',
      author: 'Content Team',
      status: 'published',
      category: 'Home Loans',
      publishedAt: '2024-01-15',
      views: 1250,
      excerpt: 'Discover the latest strategies to secure the most competitive home loan rates...'
    },
    {
      _id: '2',
      title: 'Personal Loan vs Credit Card: Which is Better?',
      slug: 'personal-loan-vs-credit-card',
      author: 'Financial Expert',
      status: 'published',
      category: 'Personal Finance',
      publishedAt: '2024-01-20',
      views: 890,
      excerpt: 'Compare the pros and cons of personal loans versus credit cards...'
    },
    {
      _id: '3',
      title: 'Understanding Your Credit Score',
      slug: 'understanding-credit-score',
      author: 'Credit Analyst',
      status: 'draft',
      category: 'Credit Score',
      publishedAt: '',
      views: 0,
      excerpt: 'A comprehensive guide to understanding and improving your credit score...'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout title="Blog Posts">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-1">Manage your blog content and articles</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-gray-900">{posts.filter(p => p.status === 'published').length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-3xl font-bold text-gray-900">{posts.filter(p => p.status === 'draft').length}</p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{posts.reduce((sum, p) => sum + p.views, 0)}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search posts by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getStatusBadgeColor(post.status)}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    <span>{post.category}</span>
                  </div>
                  {post.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishedAt}</span>
                    </div>
                  )}
                  {post.views > 0 && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      <span>{post.views} views</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new blog post.</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogAdminNew;