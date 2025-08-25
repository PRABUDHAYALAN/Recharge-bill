import { useState } from "react";
import { User, CreditCard, History, Gift, Settings, HelpCircle, LogOut, ChevronRight, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const userStats = [
    { label: "Total Recharges", value: "47", icon: "📱" },
    { label: "Bills Paid", value: "23", icon: "💡" },
    { label: "Rewards Earned", value: "1,250", icon: "🎁" },
    { label: "Money Saved", value: "₹2,500", icon: "💰" },
  ];

  const menuItems = [
    {
      icon: History,
      label: "Transaction History",
      description: "View all your transactions",
      action: () => navigate('/history'),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      description: "Manage cards and wallets",
      action: () => navigate('/payment-methods'),
    },
    {
      icon: Gift,
      label: "Rewards & Offers",
      description: "Check your rewards",
      badge: "3 New",
      action: () => navigate('/rewards'),
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage notification preferences",
      toggle: { value: notifications, onChange: setNotifications },
    },
    {
      icon: Shield,
      label: "Security",
      description: "Privacy and security settings",
      action: () => navigate('/security'),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      action: () => navigate('/support'),
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences",
      action: () => navigate('/settings'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 pb-8 text-white">
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback className="bg-white/20 text-white text-xl font-semibold">JD</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold mb-1">Prabu Dhayalan</h1>
          <p className="text-white/80 text-sm">+91 99999 88888</p>
          <p className="text-white/80 text-sm">prabu.dhayalan@email.com</p>
          <Badge className="bg-white/20 text-white border-white/30 mt-2">
            Premium Member
          </Badge>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {userStats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="bg-white shadow-card rounded-mobile-lg p-4 border-0 text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto py-3 flex flex-col gap-2 hover:bg-primary/5"
              onClick={() => navigate('/')}
            >
              <span className="text-xl">🔄</span>
              <span className="text-sm">Repeat Last</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-3 flex flex-col gap-2 hover:bg-primary/5"
              onClick={() => navigate('/mobile-recharge')}
            >
              <span className="text-xl">📱</span>
              <span className="text-sm">Recharge</span>
            </Button>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-20">
          {menuItems.map((item, index) => (
            <Card 
              key={item.label}
              className="bg-white shadow-card rounded-mobile-lg border-0 animate-slide-up"
              style={{ animationDelay: `${index * 50 + 500}ms` }}
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors rounded-mobile-lg"
                onClick={item.action}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.toggle ? (
                  <Switch
                    checked={item.toggle.value}
                    onCheckedChange={item.toggle.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              // Handle logout
              console.log("Logout clicked");
            }}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>

        {/* App Version */}
        <div className="text-center pb-4">
          <p className="text-xs text-muted-foreground">ParkQwik v2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;