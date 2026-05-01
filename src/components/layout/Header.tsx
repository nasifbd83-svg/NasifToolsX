import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'motion/react';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
            NX
          </div>
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight italic">NasifToolsX</span>
        </Link>

        {/* Global Search */}
        <div className="hidden md:flex relative flex-1 max-w-sm mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tools..." 
            className="pl-10 h-10 rounded-full bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to="/about" className="hidden md:block">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/contact" className="hidden md:block">
            <Button className="rounded-full px-6">Contact</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background px-4 py-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tools..." className="pl-10 rounded-xl" />
              </div>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm font-medium">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm font-medium">Contact</Link>
              <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm font-medium">Privacy</Link>
              <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm font-medium">Terms</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
