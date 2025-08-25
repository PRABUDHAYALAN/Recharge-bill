import { useState } from "react";
import { ArrowLeft, Zap, Calendar, AlertCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const ElectricityBill = () => {
  const [operator, setOperator] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [billData, setBillData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const electricityProviders = [
    { id: "bescom", name: "BESCOM", state: "Karnataka" },
    { id: "kseb", name: "KSEB", state: "Kerala" },
    { id: "mseb", name: "MSEB", state: "Maharashtra" },
    { id: "tneb", name: "TNEB", state: "Tamil Nadu" },
    { id: "bses", name: "BSES", state: "Delhi" },
    { id: "pspcl", name: "PSPCL", state: "Punjab" },
  ];

  const fetchBill = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBillData({
        consumerName: "John Doe",
        address: "123 Main Street, Koramangala, Bangalore",
        billNumber: "BES123456789",
        billDate: "2024-01-15",
        dueDate: "2024-02-05",
        units: 245,
        currentReading: 1245,
        previousReading: 1000,
        amount: 1847,
        fixedCharges: 150,
        energyCharges: 1230,
        taxes: 467,
        lastPaidAmount: 1520,
        lastPaidDate: "2023-12-18"
      });
      setIsLoading(false);
    }, 2000);
  };

  const getDaysUntilDue = () => {
    if (!billData) return 0;
    const today = new Date();
    const dueDate = new Date(billData.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getDueDateProgress = () => {
    if (!billData) return 0;
    const today = new Date();
    const billDate = new Date(billData.billDate);
    const dueDate = new Date(billData.dueDate);
    const totalDays = (dueDate.getTime() - billDate.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today.getTime() - billDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Electricity Bill</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Bill Input Form */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Select Provider & Enter Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Electricity Board</label>
              <Select value={operator} onValueChange={setOperator}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your electricity board" />
                </SelectTrigger>
                <SelectContent>
                  {electricityProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name} - {provider.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Consumer ID / Service Number</label>
              <Input
                type="text"
                placeholder="Enter your consumer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-primary border-0 hover:opacity-90"
              onClick={fetchBill}
              disabled={!operator || !customerId || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Fetching Bill...
                </div>
              ) : (
                "Fetch Bill"
              )}
            </Button>
          </div>
        </Card>

        {/* Loading Shimmer */}
        {isLoading && (
          <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg animate-shimmer" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded animate-shimmer mb-2" />
                  <div className="h-3 bg-muted rounded animate-shimmer w-2/3" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded animate-shimmer" />
                <div className="h-3 bg-muted rounded animate-shimmer w-4/5" />
                <div className="h-3 bg-muted rounded animate-shimmer w-3/5" />
              </div>
            </div>
          </Card>
        )}

        {/* Bill Summary */}
        {billData && !isLoading && (
          <>
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-4 border-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Bill Summary</h2>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer Name</span>
                  <span className="font-medium">{billData.consumerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bill Number</span>
                  <span className="font-medium">{billData.billNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Units Consumed</span>
                  <span className="font-medium">{billData.units} kWh</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{billData.amount}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Due Date Progress */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-4 border-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">Due Date Progress</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bill Date: {new Date(billData.billDate).toLocaleDateString()}</span>
                  <span className="text-muted-foreground">Due Date: {new Date(billData.dueDate).toLocaleDateString()}</span>
                </div>
                <Progress value={getDueDateProgress()} className="h-3" />
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getDaysUntilDue() <= 3 ? 'text-destructive' : getDaysUntilDue() <= 7 ? 'text-yellow-600' : 'text-success'}`}>
                    {getDaysUntilDue()} days remaining
                  </span>
                  {getDaysUntilDue() <= 3 && (
                    <div className="flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-xs">Overdue Soon!</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Bill Breakdown */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-20 border-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <h3 className="font-medium text-foreground mb-3">Bill Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fixed Charges</span>
                  <span>₹{billData.fixedCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Charges ({billData.units} units)</span>
                  <span>₹{billData.energyCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Other Charges</span>
                  <span>₹{billData.taxes}</span>
                </div>
                <div className="border-t pt-2 font-medium">
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{billData.amount}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pay Button */}
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-border">
              <Button
                size="lg"
                className="w-full bg-gradient-primary border-0 hover:opacity-90 h-14 text-lg font-semibold"
                onClick={() => navigate('/payment', { 
                  state: { 
                    plan: { amount: billData.amount }, 
                    mobileNumber: customerId, 
                    operator, 
                    type: 'electricity-bill',
                    billData 
                  } 
                })}
              >
                Pay ₹{billData.amount}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ElectricityBill;