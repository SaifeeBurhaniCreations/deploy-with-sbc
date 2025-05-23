
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DeployNew from "./pages/DeployNew";
import DeploymentStatus from "./pages/DeploymentStatus";
import AdminDashboard from "./pages/AdminDashboard";
import Monitor from "./pages/Monitor";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import EditDeploymentSettings from "./pages/EditDeploymentSettings";
import ConfigureDomain from "./pages/ConfigureDomain";
import SitePreview from "./pages/SitePreview";
import Marketplace from "./pages/Marketplace";
import TemplateDetail from "./pages/TemplateDetail";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="deploy" element={<DeployNew />} />
            <Route path="deployment/:id" element={<DeploymentStatus />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="monitor" element={<Monitor />} />
            <Route path="analytics/:siteId" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="edit-settings" element={<EditDeploymentSettings />} />
            <Route path="domain" element={<ConfigureDomain />} />
            <Route path="preview" element={<SitePreview />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="templates/:id" element={<TemplateDetail />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
