import { useState, useEffect } from "react";
import { ArrowLeft, Shield, CreditCard, Wallet, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { plan, mobileNumber, operator, type } = location.state || {};

  const paymentMethods = [
    { id: "wallet", name: "ParkQwik Wallet", balance: "₹2,487.50", icon: Wallet, selected: true },
    { id: "upi", name: "UPI Payment", balance: "Linked", icon: CreditCard, selected: false },
    { id: "card", name: "Debit/Credit Card", balance: "Add Card", icon: CreditCard, selected: false },
  ];

  const [selectedMethod, setSelectedMethod] = useState("wallet");

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/success', { state: { plan, mobileNumber, operator, type } });
      }, 2000);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-success flex items-center justify-center">
        <div className="text-center text-white animate-bounce-in">
          <div className="relative mb-6">
            <CheckCircle className="h-24 w-24 mx-auto animate-bounce-in" />
            <Sparkles className="h-6 w-6 absolute -top-2 -right-2 animate-pulse" />
            <Sparkles className="h-4 w-4 absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-white/90">Your recharge is being processed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Review & Pay</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Order Summary */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile Number</span>
              <span className="font-medium">{mobileNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operator</span>
              <span className="font-medium capitalize">{operator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">₹{plan?.amount} - {plan?.validity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium">{plan?.data}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary">₹{plan?.amount}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h2 className="font-semibold text-foreground mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <method.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.balance}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Info */}
        <Card className="bg-accent/20 rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Secure Payment</p>
              <p className="text-xs text-muted-foreground">Your payment is protected with end-to-end encryption</p>
            </div>
          </div>
        </Card>

        {/* Pay Button */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-border">
          <Button
            size="lg"
            className="w-full bg-gradient-primary border-0 hover:opacity-90 transition-opacity h-14 text-lg font-semibold"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing Payment...
              </div>
            ) : (
              `Pay ₹${plan?.amount}`
            )}
          </Button>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 mx-4 animate-bounce-in text-center">
            <div className="animate-spin w-12 h-12 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-muted-foreground">Please wait while we process your payment...</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Secure & Encrypted</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;