import { useState } from "react";
import { ArrowLeft, Droplet, Calendar, History, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const WaterBill = () => {
  const [operator, setOperator] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [billData, setBillData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [billHistory, setBillHistory] = useState([]);
  const navigate = useNavigate();

  const waterBoards = [
    { id: "bwssb", name: "BWSSB", state: "Bangalore" },
    { id: "dwssb", name: "Delhi Jal Board", state: "Delhi" },
    { id: "mcgm", name: "MCGM", state: "Mumbai" },
    { id: "cmwssb", name: "CMWSSB", state: "Chennai" },
    { id: "hmwssb", name: "HMWSSB", state: "Hyderabad" },
    { id: "kwssb", name: "KWA", state: "Kerala" },
  ];

  const mockHistory = [
    { month: "Dec 2023", amount: 890, units: 1200, status: "Paid", date: "2023-12-15" },
    { month: "Nov 2023", amount: 1020, units: 1350, status: "Paid", date: "2023-11-18" },
    { month: "Oct 2023", amount: 750, units: 980, status: "Paid", date: "2023-10-20" },
  ];

  const fetchBill = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setBillData({
        consumerName: "John Doe",
        address: "123 Main Street, Koramangala, Bangalore",
        connectionId: "BWS123456789",
        billDate: "2024-01-15",
        dueDate: "2024-02-10",
        unitsConsumed: 1150,
        currentReading: 12450,
        previousReading: 11300,
        amount: 1245,
        fixedCharges: 200,
        waterCharges: 865,
        taxes: 180,
        previousDue: 0
      });
      setBillHistory(mockHistory);
      setIsLoading(false);
    }, 2000);
  };

  const repeatPayment = (historyItem) => {
    navigate('/payment', {
      state: {
        plan: { amount: historyItem.amount },
        mobileNumber: customerId,
        operator,
        type: 'water-bill-repeat',
        billData: { ...billData, amount: historyItem.amount, month: historyItem.month }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Water Bill Payment</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Water Drop Illustration */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center">
            <Droplet className="h-12 w-12 text-primary animate-bounce" />
          </div>
        </div>

        {/* Bill Input Form */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Select Water Board & Enter Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Water Board</label>
              <Select value={operator} onValueChange={setOperator}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your water board" />
                </SelectTrigger>
                <SelectContent>
                  {waterBoards.map((board) => (
                    <SelectItem key={board.id} value={board.id}>
                      {board.name} - {board.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Consumer ID / Connection Number</label>
              <Input
                type="text"
                placeholder="Enter your connection ID"
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
              <h2 className="font-semibold text-foreground mb-4">Current Bill</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer Name</span>
                  <span className="font-medium">{billData.consumerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connection ID</span>
                  <span className="font-medium">{billData.connectionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water Consumption</span>
                  <span className="font-medium">{billData.unitsConsumed} Ltrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium text-yellow-600">{new Date(billData.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{billData.amount}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bill History */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-20 border-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <History className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">Bill History</h3>
              </div>
              
              <div className="space-y-3">
                {billHistory.map((bill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg animate-slide-up"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <div>
                      <p className="font-medium text-sm">{bill.month}</p>
                      <p className="text-xs text-muted-foreground">{bill.units} Ltrs • ₹{bill.amount}</p>
                      <p className="text-xs text-success">Paid on {new Date(bill.date).toLocaleDateString()}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => repeatPayment(bill)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Repeat
                    </Button>
                  </div>
                ))}
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
                    type: 'water-bill',
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

export default WaterBill;