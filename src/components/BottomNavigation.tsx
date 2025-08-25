import { Home, CreditCard, FileText, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "home", name: "Home", icon: Home, path: "/" },
    { id: "recharge", name: "Recharge", icon: CreditCard, path: "/mobile-recharge" },
    { id: "bills", name: "Bills", icon: FileText, path: "/electricity" },
    { id: "profile", name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10 scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${isActive ? "animate-bounce-in" : ""}`} />
              <span className="text-xs font-medium">{tab.name}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-ring" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;