import { useState, useEffect } from "react";
import { CheckCircle, Download, Share, Home, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { plan, mobileNumber, operator, type } = location.state || {};

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const transactionId = `TXN${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-success relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full opacity-70" />
            </div>
          ))}
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
        {/* Success Icon */}
        <div className="relative mb-8 animate-bounce-in">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse-ring">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-white/90 text-lg">Your recharge has been completed successfully</p>
        </div>

        {/* Transaction Details */}
        <Card className="w-full max-w-sm bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="space-y-4 text-center">
            <div>
              <p className="text-white/70 text-sm">Mobile Number</p>
              <p className="text-xl font-semibold">{mobileNumber}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Operator</span>
              <span className="capitalize font-medium">{operator}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Amount</span>
              <span className="font-medium">₹{plan?.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Transaction ID</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-white/70 text-xs">
                {new Date().toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3 animate-slide-up" style={{ animationDelay: "0.9s" }}>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <Button
            size="lg"
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={() => navigate('/mobile-recharge')}
          >
            <Repeat className="w-4 h-4 mr-2" />
            Recharge Again
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <p className="text-white/60 text-sm">
            🎉 Congratulations! You've earned 25 reward points
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;