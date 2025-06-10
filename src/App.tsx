
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderInfo from "./pages/provider/ProviderInfo";
import ProviderVehicles from "./pages/provider/ProviderVehicles";
import ProviderOrders from "./pages/provider/ProviderOrders";
import ProviderPricing from "./pages/provider/ProviderPricing";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffInfo from "./pages/staff/StaffInfo";
import StaffUnprocessedOrders from "./pages/staff/StaffUnprocessedOrders";
import StaffProcessedOrders from "./pages/staff/StaffProcessedOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/info" element={<ProviderInfo />} />
          <Route path="/provider/vehicles" element={<ProviderVehicles />} />
          <Route path="/provider/orders" element={<ProviderOrders />} />
          <Route path="/provider/pricing" element={<ProviderPricing />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/info" element={<StaffInfo />} />
          <Route path="/staff/unprocessed" element={<StaffUnprocessedOrders />} />
          <Route path="/staff/processed" element={<StaffProcessedOrders />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
