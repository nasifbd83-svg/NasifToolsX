import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, ArrowRightLeft } from 'lucide-react';

export const CaseConverter = () => {
  const [text, setText] = useState('');

  const convert = (type: string) => {
    switch (type) {
      case 'upper': setText(text.toUpperCase()); break;
      case 'lower': setText(text.toLowerCase()); break;
      case 'sentence': 
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
        break;
      case 'title':
        setText(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
        break;
      case 'camel':
        setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
        break;
      case 'snake':
        setText(text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''));
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <textarea
          className="w-full h-64 p-6 rounded-3xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary resize-none font-sans text-lg"
          placeholder="Paste your text to convert..."
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Button onClick={() => convert('upper')} variant="outline" className="rounded-xl h-12 uppercase font-bold">UPPERCASE</Button>
        <Button onClick={() => convert('lower')} variant="outline" className="rounded-xl h-12 lowercase font-bold">lowercase</Button>
        <Button onClick={() => convert('sentence')} variant="outline" className="rounded-xl h-12 font-bold">Sentence case</Button>
        <Button onClick={() => convert('title')} variant="outline" className="rounded-xl h-12 font-bold">Title Case</Button>
        <Button onClick={() => convert('camel')} variant="outline" className="rounded-xl h-12 font-bold">camelCase</Button>
        <Button onClick={() => convert('snake')} variant="outline" className="rounded-xl h-12 font-bold">snake_case</Button>
      </div>
    </div>
  );
};
