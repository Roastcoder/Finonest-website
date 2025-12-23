import { useState, useEffect } from "react";
import { Calculator, IndianRupee, Percent, Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(60);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure;

    if (rate === 0) {
      setEmi(principal / time);
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      const emiValue = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalAmountValue = emiValue * time;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInterestValue));
      setTotalAmount(Math.round(totalAmountValue));
    }
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  const principalPercent = totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 0;
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">EMI Calculator</h1>
        <p className="text-muted-foreground">Calculate your monthly loan payments instantly</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Loan Amount
                </label>
                <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
                  <span className="text-sm text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-28 h-8 border-0 bg-transparent text-right font-semibold p-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={100000}
                max={50000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹1 Lakh</span>
                <span>₹5 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Percent className="w-4 h-4 text-primary" />
                  Interest Rate (p.a.)
                </label>
                <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-16 h-8 border-0 bg-transparent text-right font-semibold p-0 focus-visible:ring-0"
                    step={0.1}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={1}
                max={30}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  Loan Tenure
                </label>
                <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-16 h-8 border-0 bg-transparent text-right font-semibold p-0 focus-visible:ring-0"
                  />
                  <span className="text-sm text-muted-foreground">months</span>
                </div>
              </div>
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                min={6}
                max={360}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6 months</span>
                <span>30 years</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {/* EMI Result Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Monthly EMI</p>
                <p className="text-4xl font-bold text-primary">{formatCurrency(emi)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6 space-y-6">
              {/* Visual breakdown */}
              <div className="space-y-3">
                <div className="h-4 rounded-full overflow-hidden bg-muted flex">
                  <div 
                    className="bg-primary transition-all duration-500"
                    style={{ width: `${principalPercent}%` }}
                  />
                  <div 
                    className="bg-destructive/70 transition-all duration-500"
                    style={{ width: `${interestPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Principal ({principalPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <span className="text-muted-foreground">Interest ({interestPercent.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Amount breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="font-semibold text-foreground">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-semibold text-destructive">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-muted/50 rounded-lg px-4 -mx-4">
                  <span className="font-medium text-foreground">Total Amount Payable</span>
                  <span className="font-bold text-lg text-foreground">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
