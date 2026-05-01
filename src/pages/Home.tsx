import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../lib/tools-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Home = () => {
  const [search, setSearch] = React.useState('');
  
  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['All', 'Image', 'PDF', 'Text'];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 px-4 border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05),transparent)] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary mb-6 tracking-wider uppercase">
              10+ Free Online Tools
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              NasifToolsX <br /> <span className="text-primary">Fast, Free & Smart</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Professional-grade tools for creators, developers, and students.
              Processed 100% in your browser for ultimate privacy.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 px-4"
          >
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Find a tool (e.g. 'compress image', 'merge pdf')..." 
                className="pl-12 h-14 md:h-16 text-lg rounded-2xl shadow-xl shadow-primary/5 border-muted-foreground/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Recent Tools Widget */}
          {(() => {
            const saved = localStorage.getItem('recent_tools');
            const recentIds = saved ? JSON.parse(saved) : [];
            const recentTools = TOOLS.filter(t => recentIds.includes(t.id));
            
            if (recentTools.length === 0) return null;

            return (
              <div className="mb-16">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Zap className="h-5 w-5 mr-3 text-primary animate-pulse" />
                  Recent Tools
                </h2>
                <div className="flex flex-wrap gap-4">
                  {recentTools.map(tool => (
                    <Link key={tool.id} to={tool.path}>
                      <div className="flex items-center space-x-3 px-4 py-3 bg-muted/50 rounded-2xl border border-muted-foreground/10 hover:border-primary/30 transition-all hover:bg-muted group">
                         <div className="p-2 rounded-lg bg-background group-hover:text-primary transition-colors">
                           <tool.icon className="h-4 w-4" />
                         </div>
                         <span className="text-sm font-bold">{tool.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
          <Tabs defaultValue="All" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat} className="rounded-md px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Instant client-side processing</span>
              </div>
            </div>

            {categories.map(cat => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredTools
                    .filter(tool => cat === 'All' || tool.category === cat)
                    .map(tool => (
                      <motion.div key={tool.id} variants={item}>
                        <Link to={tool.path}>
                          <Card className="h-full group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl border-muted-foreground/10">
                            <CardHeader className="relative pb-4">
                              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                <tool.icon className="h-7 w-7" />
                              </div>
                              <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                              <CardDescription className="text-sm line-clamp-2 mt-1">
                                {tool.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 uppercase tracking-widest">
                                Open Tool <ArrowRight className="ml-2 h-3 w-3" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Privacy</h3>
              <p className="text-muted-foreground">Your files never leave your computer. All processing happens in your browser.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">No server delays or upload times. Experience instant results with high-speed performance.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Friendly</h3>
              <p className="text-muted-foreground">Optimized for every device. Use our tools on your phone, tablet, or desktop.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Branding Label */}
      <div className="py-12 flex justify-center opacity-50 select-none">
        <span className="text-sm font-mono tracking-tighter uppercase font-bold">Made By Nasif</span>
      </div>
    </div>
  );
};
