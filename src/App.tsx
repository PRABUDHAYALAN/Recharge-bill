import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import Home from "./pages/Home";
import MobileRecharge from "./pages/MobileRecharge";
import ElectricityBill from "./pages/ElectricityBill";
import WaterBill from "./pages/WaterBill";
import GasCylinder from "./pages/GasCylinder";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout><Home /></MobileLayout>} />
          <Route path="/mobile-recharge" element={<MobileLayout><MobileRecharge /></MobileLayout>} />
          <Route path="/electricity" element={<MobileLayout><ElectricityBill /></MobileLayout>} />
          <Route path="/water" element={<MobileLayout><WaterBill /></MobileLayout>} />
          <Route path="/gas" element={<MobileLayout><GasCylinder /></MobileLayout>} />
          <Route path="/payment" element={<MobileLayout showBottomNav={false}><PaymentPage /></MobileLayout>} />
          <Route path="/success" element={<MobileLayout showBottomNav={false}><SuccessPage /></MobileLayout>} />
          <Route path="/profile" element={<MobileLayout><Profile /></MobileLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
