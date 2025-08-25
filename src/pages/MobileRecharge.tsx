import { useState, useEffect } from "react";
import { ArrowLeft, Phone, Users, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const MobileRecharge = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const operators = [
    { id: "airtel", name: "Airtel", color: "from-red-500 to-red-600" },
    { id: "jio", name: "Jio", color: "from-blue-500 to-blue-600" },
    { id: "vi", name: "Vi", color: "from-purple-500 to-purple-600" },
    { id: "bsnl", name: "BSNL", color: "from-orange-500 to-orange-600" },
  ];

  const popularPlans = [
    { id: 1, amount: 179, validity: "28 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: "Popular" },
    { id: 2, amount: 299, validity: "28 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: "Best Value" },
    { id: 3, amount: 449, validity: "56 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: null },
    { id: 4, amount: 599, validity: "84 days", data: "2GB/day", calls: "Unlimited", sms: "100/day", tag: null },
  ];

  const dataPlans = [
    { id: 5, amount: 19, validity: "1 day", data: "1GB", calls: "No", sms: "No", tag: "Data Only" },
    { id: 6, amount: 48, validity: "3 days", data: "3GB", calls: "No", sms: "No", tag: null },
    { id: 7, amount: 118, validity: "14 days", data: "12GB", calls: "No", sms: "No", tag: null },
    { id: 8, amount: 251, validity: "30 days", data: "50GB", calls: "No", sms: "No", tag: "Heavy User" },
  ];

  const validityPlans = [
    { id: 9, amount: 95, validity: "28 days", data: "200MB", calls: "Unlimited", sms: "300", tag: null },
    { id: 10, amount: 155, validity: "56 days", data: "1GB", calls: "Unlimited", sms: "300", tag: null },
    { id: 11, amount: 1699, validity: "365 days", data: "24GB", calls: "Unlimited", sms: "3600", tag: "Annual" },
  ];

  // Detect operator based on number
  useEffect(() => {
    if (mobileNumber.length >= 4) {
      const prefix = mobileNumber.substring(0, 4);
      if (['9876', '9877', '9878'].includes(prefix)) {
        setOperator("airtel");
      } else if (['9999', '8888', '7777'].includes(prefix)) {
        setOperator("jio");
      } else if (['9854', '9855', '9856'].includes(prefix)) {
        setOperator("vi");
      } else {
        setOperator("bsnl");
      }
    }
  }, [mobileNumber]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/payment', { state: { plan, mobileNumber, operator, type: 'mobile-recharge' } });
    }, 1000);
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Mobile Recharge</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Mobile Number Input */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Enter Mobile Number</h2>
          </div>
          
          <div className="relative mb-4">
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="text-lg font-medium text-center"
              maxLength={10}
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Users className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {keypadNumbers.flat().map((num) => (
              <Button
                key={num}
                variant="ghost"
                className="h-12 text-lg font-medium hover:bg-primary/10"
                onClick={() => {
                  if (mobileNumber.length < 10) {
                    setMobileNumber(prev => prev + num);
                  }
                }}
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Operator Detection */}
          {operator && (
            <div className="flex items-center justify-center gap-2 p-3 bg-accent/50 rounded-lg animate-fade-in">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${operators.find(op => op.id === operator)?.color}`} />
              <span className="text-sm font-medium text-foreground">
                {operators.find(op => op.id === operator)?.name} Detected
              </span>
            </div>
          )}
        </Card>

        {/* Plans Section */}
        {mobileNumber.length === 10 && operator && (
          <Card className="shadow-card rounded-mobile-lg border-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-t-mobile-lg">
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="validity" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Validity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="mt-0 p-4 space-y-3">
                {popularPlans.map((plan, index) => (
                  <Card
                    key={plan.id}
                    className="p-4 border cursor-pointer hover:shadow-button transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-primary">₹{plan.amount}</span>
                          {plan.tag && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                              {plan.tag}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>📅 {plan.validity}</div>
                          <div>📱 {plan.data}</div>
                          <div>📞 {plan.calls}</div>
                          <div>💬 {plan.sms}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Recharge
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="data" className="mt-0 p-4 space-y-3">
                {dataPlans.map((plan, index) => (
                  <Card
                    key={plan.id}
                    className="p-4 border cursor-pointer hover:shadow-button transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-primary">₹{plan.amount}</span>
                           {plan.tag && (
                             <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                               {plan.tag}
                             </span>
                           )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>📅 {plan.validity}</div>
                          <div>📱 {plan.data}</div>
                          <div>📞 {plan.calls}</div>
                          <div>💬 {plan.sms}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Recharge
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="validity" className="mt-0 p-4 space-y-3">
                {validityPlans.map((plan, index) => (
                  <Card
                    key={plan.id}
                    className="p-4 border cursor-pointer hover:shadow-button transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-primary">₹{plan.amount}</span>
                           {plan.tag && (
                             <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                               {plan.tag}
                             </span>
                           )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>📅 {plan.validity}</div>
                          <div>📱 {plan.data}</div>
                          <div>📞 {plan.calls}</div>
                          <div>💬 {plan.sms}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Recharge
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 mx-4 animate-bounce-in">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-foreground">Processing your recharge...</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MobileRecharge;