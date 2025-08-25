import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Smartphone, 
  Zap, 
  Droplet, 
  Fuel, 
  Tv, 
  CreditCard,
  Home as HomeIcon,
  Phone,
  Bell,
  Search,
  Gift,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const services = [
    { id: "mobile", name: "Mobile Recharge", icon: Smartphone, route: "/mobile-recharge" },
    { id: "electricity", name: "Electricity", icon: Zap, route: "/electricity" },
    { id: "water", name: "Water Bill", icon: Droplet, route: "/water" },
    { id: "gas", name: "Gas Cylinder", icon: Fuel, route: "/gas" },
    { id: "dth", name: "DTH Recharge", icon: Tv, route: "/dth" },
    { id: "loan", name: "Loan Payment", icon: CreditCard, route: "/loan" },
    { id: "rent", name: "Rent Payment", icon: HomeIcon, route: "/rent" },
    { id: "postpaid", name: "Postpaid Bill", icon: Phone, route: "/postpaid" },
  ];

  const quickActions = [
    { name: "Repeat Last", icon: "🔄", value: "₹299" },
    { name: "Pay Bills", icon: "💡", value: "Due Today" },
    { name: "Offers", icon: "🎁", value: "50% Off" },
  ];

  return (
    <div className="min-h-screen bg-background font-mobile">
      {/* Header */}
      <div className="bg-gradient-primary p-4 pb-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-white/20 text-white">PD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm opacity-90">Good Morning</p>
              <p className="font-semibold">Prabu Dhayalan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Gift className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for services, offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-mobile-lg border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Balance Card */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="text-2xl font-bold text-primary">₹2,487.50</p>
            </div>
            <Button size="sm" className="bg-gradient-primary border-0 hover:opacity-90 transition-opacity">
              Add Money
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickActions.map((action, index) => (
            <Card 
              key={action.name} 
              className="p-3 shadow-card rounded-mobile border-0 hover:shadow-button transition-all duration-300 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{action.icon}</div>
                <p className="text-xs font-medium text-foreground">{action.name}</p>
                <p className="text-xs text-primary font-semibold">{action.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Services Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">All Services</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className="p-4 shadow-card rounded-mobile-lg border-0 hover:shadow-button transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(service.route)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{service.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-20">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { service: "Mobile Recharge", amount: "₹299", number: "98****5678", status: "Success", time: "2 hrs ago" },
              { service: "Electricity Bill", amount: "₹1,245", number: "BES****890", status: "Success", time: "Yesterday" },
              { service: "DTH Recharge", amount: "₹199", number: "Airtel Digital TV", status: "Pending", time: "2 days ago" },
            ].map((transaction, index) => (
              <Card 
                key={index}
                className="p-4 shadow-card rounded-mobile border-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{transaction.service}</p>
                    <p className="text-xs text-muted-foreground">{transaction.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">{transaction.amount}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        transaction.status === 'Success' ? 'bg-success' : 
                        transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-destructive'
                      }`} />
                      <span className="text-xs text-muted-foreground">{transaction.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;