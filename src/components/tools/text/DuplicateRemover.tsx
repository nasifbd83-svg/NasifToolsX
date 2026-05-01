import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Filter } from 'lucide-react';

export const DuplicateRemover = () => {
  const [text, setText] = useState('');
  const [originalCount, setOriginalCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  const removeDuplicates = () => {
    const lines = text.split(/\r\n|\r|\n/);
    setOriginalCount(lines.length);
    const uniqueLines = Array.from(new Set(lines.map(line => line.trim()).filter(line => line !== '')));
    setText(uniqueLines.join('\n'));
    setNewCount(uniqueLines.length);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <textarea
          className="w-full h-80 p-6 rounded-3xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary resize-none font-sans text-lg"
          placeholder="Paste your list here (one item per line)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="secondary" size="icon" onClick={() => navigator.clipboard.writeText(text)} className="rounded-xl h-10 w-10">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => setText('')} className="rounded-xl h-10 w-10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <Button 
          onClick={removeDuplicates} 
          className="rounded-2xl h-14 px-8 font-bold text-lg w-full md:w-auto shadow-lg shadow-primary/20"
        >
          <Filter className="mr-2 h-5 w-5" />
          Remove Duplicates
        </Button>

        {originalCount > 0 && (
          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-xl font-black text-muted-foreground">{originalCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Before</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-primary">{newCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-primary">After</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-green-500">{originalCount - newCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-green-500">Removed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
