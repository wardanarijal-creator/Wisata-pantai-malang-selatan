import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Beaches from "./pages/Beaches";
import BeachDetail from "./pages/BeachDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBeaches from "./pages/admin/AdminBeaches";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminServices from "./pages/admin/AdminServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wisata" element={<Beaches />} />
          <Route path="/wisata/:slug" element={<BeachDetail />} />
          <Route path="/artikel" element={<Articles />} />
          <Route path="/artikel/:slug" element={<ArticleDetail />} />
          <Route path="/toko/produk" element={<Products />} />
          <Route path="/toko/layanan" element={<Services />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pantai" element={<AdminBeaches />} />
            <Route path="artikel" element={<AdminArticles />} />
            <Route path="produk" element={<AdminProducts />} />
            <Route path="layanan" element={<AdminServices />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
