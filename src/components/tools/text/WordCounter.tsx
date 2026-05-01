import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    lines: text ? text.split(/\r\n|\r|\n/).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'No Spaces', value: stats.charsNoSpaces },
          { label: 'Lines', value: stats.lines },
          { label: 'Reading Time', value: `${stats.readingTime} min` },
        ].map((stat, i) => (
          <div key={i} className="bg-primary/5 rounded-2xl p-4 text-center border border-primary/10">
            <p className="text-2xl font-black text-primary">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-80 p-6 rounded-3xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary resize-none font-sans text-lg"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="secondary" size="icon" onClick={handleCopy} className="rounded-xl h-10 w-10">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => setText('')} className="rounded-xl h-10 w-10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
