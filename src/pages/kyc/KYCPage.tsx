import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileCheck, CheckCircle, Upload, Shield, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/forms/FileUpload";
import { Button } from "@/components/ui/button";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UploadedDocs {
  aadhaarFront: boolean;
  aadhaarBack: boolean;
  pan: boolean;
  photo: boolean;
  bankStatement: boolean;
  salarySlip: boolean;
}

const KYCPage = () => {
  // User state for future use with actual file uploads
  const [_user, setUser] = useState<SupabaseUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocs>({
    aadhaarFront: false,
    aadhaarBack: false,
    pan: false,
    photo: false,
    bankStatement: false,
    salarySlip: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/kyc");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/kyc");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUpload = async (docType: keyof UploadedDocs, file: File) => {
    // In production, this would upload to Supabase Storage
    console.log(`Uploading ${docType}:`, file.name);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
    toast({
      title: "Document Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleRemove = (docType: keyof UploadedDocs) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: false }));
  };

  const requiredDocs = ["aadhaarFront", "aadhaarBack", "pan", "photo"];
  const isComplete = requiredDocs.every(doc => uploadedDocs[doc as keyof UploadedDocs]);

  const handleSubmit = async () => {
    if (!isComplete) {
      toast({
        variant: "destructive",
        title: "Incomplete Documents",
        description: "Please upload all required documents.",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "KYC Submitted!",
      description: "Your documents are being verified.",
    });
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6 pt-24">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              KYC Documents Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your documents are under verification. This usually takes 2-4 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/status">Check Status</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>KYC Document Upload - Finonest</title>
        <meta name="description" content="Upload your KYC documents securely for loan application verification." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Upload KYC Documents
            </h1>
            <p className="text-muted-foreground">
              Complete your KYC by uploading the required documents
            </p>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl mb-8 border border-primary/20">
            <Shield className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              Your documents are encrypted and stored securely. We follow RBI guidelines for data protection.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
            {/* Required Documents */}
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Required Documents
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FileUpload
                label="Aadhaar Card (Front)"
                accept="image/*,.pdf"
                maxSize={5}
                onUpload={(file) => handleUpload("aadhaarFront", file)}
                onRemove={() => handleRemove("aadhaarFront")}
                hint="Clear image of Aadhaar front side"
              />
              <FileUpload
                label="Aadhaar Card (Back)"
                accept="image/*,.pdf"
                maxSize={5}
                onUpload={(file) => handleUpload("aadhaarBack", file)}
                onRemove={() => handleRemove("aadhaarBack")}
                hint="Clear image of Aadhaar back side"
              />
              <FileUpload
                label="PAN Card"
                accept="image/*,.pdf"
                maxSize={5}
                onUpload={(file) => handleUpload("pan", file)}
                onRemove={() => handleRemove("pan")}
                hint="Clear image of your PAN card"
              />
              <FileUpload
                label="Passport Photo"
                accept="image/*"
                maxSize={2}
                onUpload={(file) => handleUpload("photo", file)}
                onRemove={() => handleRemove("photo")}
                hint="Recent passport-size photo"
              />
            </div>

            {/* Optional Documents */}
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Optional Documents (Faster Processing)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FileUpload
                label="Bank Statement (Last 3 months)"
                accept=".pdf"
                maxSize={10}
                onUpload={(file) => handleUpload("bankStatement", file)}
                onRemove={() => handleRemove("bankStatement")}
                hint="PDF of last 3 months statement"
              />
              <FileUpload
                label="Salary Slip (Last 3 months)"
                accept="image/*,.pdf"
                maxSize={5}
                onUpload={(file) => handleUpload("salarySlip", file)}
                onRemove={() => handleRemove("salarySlip")}
                hint="For salaried applicants"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-border">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!isComplete}
              >
                <Upload className="w-5 h-5 mr-2" />
                Submit KYC Documents
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KYCPage;
