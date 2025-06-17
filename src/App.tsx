import { Toaster } from "@/components/ui/toaster"; // shadcn/ui toaster
import { Toaster as Sonner } from "@/components/ui/sonner"; // sonner toast
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import BrowsePage from "./pages/BrowsePage";
import ContentDetailPage from "./pages/ContentDetailPage";
import SubmitContentPage from "./pages/SubmitContentPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn/ui toasts, if SubmissionWizardForm still uses the old one */}
      <Sonner richColors position="top-right" /> {/* For sonner toasts used in ContentDetailPage & SubmissionWizardForm via useToast hook */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/content/:id" element={<ContentDetailPage />} />
          <Route path="/submit" element={<SubmitContentPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          {/* Example of a nested route if needed, e.g., /profile/edit - not created in this task */}
          {/* <Route path="/profile/edit" element={<EditUserProfilePage />} /> */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;