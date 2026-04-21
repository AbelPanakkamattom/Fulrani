import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
       <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
