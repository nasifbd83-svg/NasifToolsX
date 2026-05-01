import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TooltipProvider } from '../ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
};
