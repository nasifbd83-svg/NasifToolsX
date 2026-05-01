import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted/30 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>
              <span className="font-bold text-lg">Nasif Tools</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-6">
              Your one-stop destination for high-quality, secure online tools. 
              We process everything in your browser, keeping your data private and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background border hover:border-primary transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/image-compressor" className="hover:text-primary transition-colors">Image Compressor</Link></li>
              <li><Link to="/merge-pdf" className="hover:text-primary transition-colors">Merge PDF</Link></li>
              <li><Link to="/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
              <li><Link to="/pdf-to-image" className="hover:text-primary transition-colors">PDF to Image</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nasif Tools. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>by</span>
            <span className="font-bold text-foreground">Nasif</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
