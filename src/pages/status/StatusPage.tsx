import { useState } from "react";
import { Helmet } from "react-helmet";
import { Search, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkApplicationStatus } from "@/lib/api";
import { isValidPhone, formatCurrency } from "@/lib/validators";

interface Application {
  id: string;
  loan_type: string;
  amount: number;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-600 bg-yellow-100", label: "Under Review" },
  approved: { icon: CheckCircle, color: "text-green-600 bg-green-100", label: "Approved" },
  rejected: { icon: XCircle, color: "text-red-600 bg-red-100", label: "Rejected" },
  processing: { icon: AlertCircle, color: "text-blue-600 bg-blue-100", label: "Processing" },
};

const StatusPage = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPhone(phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setError("");
    setLoading(true);
    
    const result = await checkApplicationStatus(phone);
    
    if (result.success) {
      setApplications(result.data || []);
      setSearched(true);
    } else {
      setError(result.error || "Failed to fetch applications");
    }
    
    setLoading(false);
  };

  const getStatusDisplay = (status: string) => {
    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>Check Application Status - Finonest</title>
        <meta name="description" content="Track your loan application status in real-time. Enter your mobile number to check the current status of your applications." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Check Application Status
            </h1>
            <p className="text-muted-foreground">
              Enter your registered mobile number to track your application
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-8 mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={error ? "border-destructive" : ""}
                />
                {error && <p className="text-sm text-destructive mt-1">{error}</p>}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Results */}
          {searched && (
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Applications Found
                  </h3>
                  <p className="text-muted-foreground">
                    We couldn't find any applications with this mobile number.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Your Applications ({applications.length})
                  </h2>
                  
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 bg-muted/50 rounded-xl border border-border"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{app.loan_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            Amount: {formatCurrency(app.amount)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Applied on {new Date(app.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                        <div>
                          {getStatusDisplay(app.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StatusPage;
