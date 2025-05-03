
import React from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
