import { motion } from 'motion/react';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black mb-8 tracking-tight">About Nasif Tools</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Nasif Tools is a premium collection of online utilities designed for the modern web. Our mission is to provide fast, secure, and easy-to-use tools for everyday tasks like image processing, PDF manipulation, and text management.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Why Nasif Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-muted/30 p-8 rounded-3xl border">
              <h3 className="font-bold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">We use client-side technology, meaning your files stay on your device and are never uploaded to any server.</p>
            </div>
            <div className="bg-muted/30 p-8 rounded-3xl border">
              <h3 className="font-bold mb-2">High Performance</h3>
              <p className="text-sm text-muted-foreground">Powered by modern browser APIs and efficient libraries like pdf-lib and browser-image-compression.</p>
            </div>
          </div>

          <p className="text-muted-foreground">
            Created with passion by <span className="font-bold text-foreground">Nasif</span>, this platform is dedicated to making digital workflows smoother for developers, content creators, and students alike.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
