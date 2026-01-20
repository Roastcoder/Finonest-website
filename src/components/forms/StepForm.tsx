import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  isValid?: () => boolean;
}

interface StepFormProps {
  steps: Step[];
  onComplete: () => Promise<void>;
  submitLabel?: string;
  className?: string;
}

const StepForm = ({
  steps,
  onComplete,
  submitLabel = "Submit Application",
  className = ""
}: StepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (step.isValid && !step.isValid()) {
      return;
    }
    
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onComplete();
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (index: number) => {
    // Only allow going to completed steps or the next uncompleted step
    if (completedSteps.has(index) || index === currentStep || index === Math.max(...completedSteps) + 1) {
      setCurrentStep(index);
    }
  };

  return (
    <div className={className}>
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => goToStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  completedSteps.has(index)
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {completedSteps.has(index) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 rounded ${
                    completedSteps.has(index) ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
          {step.description && (
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          )}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {step.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button onClick={handleNext} disabled={loading}>
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isLastStep ? (
            <>
              {submitLabel}
              <Check className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepForm;
