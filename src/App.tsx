import OfflineMode from './pages/OfflineMode';
import RecruiterSpace from './pages/RecruiterSpace';
import CustomAlerts from './pages/CustomAlerts';
import InteractiveMap3D from './pages/InteractiveMap3D';
import ProfileCreation from './pages/ProfileCreation';
import AdvancedSearch from './pages/AdvancedSearch';
import Contact from './pages/Contact';
import About from './pages/About';
import Candidates from './pages/Candidates';
import Employers from './pages/Employers';
import Jobs from './pages/Jobs';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import ChatbotWidget from "@/components/ChatbotWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Ces routes sont déjà déclarées plus haut, on les retire ici */}
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
  <Route path="/advanced-search" element={<AdvancedSearch />} />
  <Route path="/profile-creation" element={<ProfileCreation />} />
  <Route path="/map-3d" element={<InteractiveMap3D />} />
  <Route path="/alerts" element={<CustomAlerts />} />
  <Route path="/recruiter-space" element={<RecruiterSpace />} />
  <Route path="/offline-mode" element={<OfflineMode />} />
        </Routes>
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
