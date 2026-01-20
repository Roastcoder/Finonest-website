import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight } from "lucide-react";
import { validateLeadForm, type LeadFormData } from "@/lib/validators";

interface LeadFormProps {
  loanType?: string;
  onSubmit: (data: LeadFormData) => Promise<void>;
  showLoanTypeSelect?: boolean;
  submitLabel?: string;
  className?: string;
}

const loanTypes = [
  { value: "Home Loan", label: "Home Loan" },
  { value: "Car Loan", label: "Car Loan" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Loan Against Property", label: "Loan Against Property" },
];

const LeadForm = ({
  loanType = "",
  onSubmit,
  showLoanTypeSelect = true,
  submitLabel = "Get Started",
  className = ""
}: LeadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    phone: "",
    email: "",
    loanType: loanType,
  });

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <Input
          type="text"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Mobile Number *"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {showLoanTypeSelect && (
        <div>
          <select
            value={formData.loanType}
            onChange={(e) => handleChange("loanType", e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground ${
              errors.loanType ? "border-destructive" : "border-border"
            }`}
          >
            <option value="">Select Loan Type *</option>
            {loanTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.loanType && (
            <p className="text-sm text-destructive mt-1">{errors.loanType}</p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
