import React, { useState, useEffect } from 'react';
import { ToolHeader } from '../components/tools/ToolHeader';
import { TOOLS } from '../lib/tools-config';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

interface ToolPageWrapperProps {
  children: React.ReactNode;
}

export const ToolPageWrapper = ({ children }: ToolPageWrapperProps) => {
  const location = useLocation();
  const tool = TOOLS.find(t => t.path === location.pathname);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track recent tools
  useEffect(() => {
    if (tool) {
      const saved = localStorage.getItem('recent_tools');
      let recent = saved ? JSON.parse(saved) as string[] : [];
      recent = [tool.id, ...recent.filter(id => id !== tool.id)].slice(0, 4);
      localStorage.setItem('recent_tools', JSON.stringify(recent));
    }
  }, [tool?.id]);

  if (!tool) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-8 uppercase tracking-widest font-bold">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ArrowRight className="h-3 w-3" />
        <span className="text-primary">{tool.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          {/* Header Ad Placeholder */}
          <div className="w-full h-32 bg-muted/50 rounded-2xl border flex items-center justify-center mb-12 text-muted-foreground text-xs font-mono">
            AD UNIT: HEADER (AD SENSE READY)
          </div>

          <ToolHeader tool={tool} />
          
          <div className="mb-20">
            {children}
          </div>

          {/* Footer Ad Placeholder */}
          <div className="w-full h-32 bg-muted/50 rounded-2xl border flex items-center justify-center mt-12 text-muted-foreground text-xs font-mono">
            AD UNIT: IN-CONTENT (AD SENSE READY)
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col space-y-8">
          {/* Sidebar Ad 1 */}
          <div className="w-full aspect-square bg-muted/50 rounded-3xl border flex items-center justify-center text-muted-foreground text-xs font-mono">
            AD UNIT: SIDEBAR 1
          </div>

          {/* Popular Tools Widget */}
          <Card className="rounded-3xl border-muted-foreground/10">
            <CardContent className="pt-6">
              <h3 className="font-bold flex items-center mb-4">
                <Star className="h-4 w-4 mr-2 text-amber-500 fill-amber-500" />
                Popular Tools
              </h3>
              <div className="space-y-4">
                {TOOLS.filter(t => t.id !== tool.id).slice(0, 5).map(t => (
                  <Link key={t.id} to={t.path} className="flex items-center group">
                    <div className="h-10 w-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mr-3 transition-colors">
                      <t.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 border-b pb-2 group-last:border-0 border-muted-foreground/10">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{t.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Ad 2 */}
          <div className="w-full h-64 bg-muted/50 rounded-3xl border flex items-center justify-center text-muted-foreground text-xs font-mono">
            AD UNIT: SIDEBAR 2
          </div>
        </div>
      </div>
    </div>
  );
};
