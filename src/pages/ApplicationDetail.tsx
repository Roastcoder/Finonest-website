import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Calendar, IndianRupee, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { customerAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadApplication = async () => {
      if (!id) {
        navigate('/customer/dashboard');
        return;
      }

      try {
        setLoading(true);
        const res = await customerAPI.getApplication(id);
        if (res.status === 'ok' && res.data) {
          setApplication(res.data);
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Application not found",
          });
          navigate('/customer/dashboard');
        }
      } catch (error: any) {
        console.error('Failed to load application:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load application details",
        });
        navigate('/customer/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id, navigate, toast]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string, icon: any }> = {
      new: { variant: "default", label: "New", icon: Clock },
      contacted: { variant: "secondary", label: "Contacted", icon: Clock },
      qualified: { variant: "secondary", label: "Qualified", icon: Clock },
      approved: { variant: "default", label: "Approved", icon: CheckCircle },
      rejected: { variant: "destructive", label: "Rejected", icon: XCircle },
      lost: { variant: "outline", label: "Lost", icon: XCircle },
    };
    const config = statusConfig[status] || { variant: "outline" as const, label: status, icon: FileText };
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Application Details - Finonest</title>
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/">
              <img src={logo} alt="Finonest" className="h-10 object-contain" />
            </Link>
            <Button variant="outline" onClick={() => navigate('/customer/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Application Details
            </h1>
            {application.applicationNumber && (
              <p className="text-muted-foreground">
                Application #: {application.applicationNumber}
              </p>
            )}
          </div>

          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Application Status</CardTitle>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {application.loanType && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Loan Type</p>
                      <p className="font-medium">{application.loanType}</p>
                    </div>
                  )}
                  {application.loanAmount && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                      <p className="font-medium flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {formatCurrency(application.loanAmount)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Applied On</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(application.createdAt)}
                    </p>
                  </div>
                  {application.assignedTo && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Assigned To</p>
                      <p className="font-medium">{application.assignedTo.name || application.assignedTo.email}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Application Data */}
            <Card>
              <CardHeader>
                <CardTitle>Application Information</CardTitle>
                <CardDescription>Details submitted with your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(application.data || {}).map(([key, value]: [string, any]) => {
                    if (value === null || value === undefined || value === '') return null;
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="border-b border-border pb-2 last:border-0">
                        <p className="text-sm text-muted-foreground mb-1">{label}</p>
                        <p className="font-medium">{String(value)}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Files/Documents */}
            {application.files && application.files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {application.files.map((file: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{file.filename || 'Document'}</p>
                            {file.size && (
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            )}
                          </div>
                        </div>
                        {file.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ApplicationDetail;
