
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import MainLayout from "./components/layout/MainLayout";
import { Header } from "./components/layout/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes with layout */}
          <Route path="/" element={
            <>
              <Header />
              <MainLayout>
                <Index />
              </MainLayout>
            </>
          } />
          
          <Route path="/dashboard" element={
            <>
              <Header />
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </>
          } />
          
          <Route path="/my-tasks" element={
            <>
              <Header />
              <MainLayout>
                <MyTasks />
              </MainLayout>
            </>
          } />
          
          {/* Placeholder routes */}
          <Route path="/calendar" element={
            <>
              <Header />
              <MainLayout>
                <div className="py-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </MainLayout>
            </>
          } />
          
          <Route path="/team" element={
            <>
              <Header />
              <MainLayout>
                <div className="py-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Team Management</h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </MainLayout>
            </>
          } />
          
          <Route path="/settings" element={
            <>
              <Header />
              <MainLayout>
                <div className="py-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Settings</h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </MainLayout>
            </>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
