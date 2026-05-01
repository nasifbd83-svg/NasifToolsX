import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Scissors } from 'lucide-react';

export const PdfSplit = () => {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState('1');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileSelect = async (files: File[]) => {
    if (files && files[0]) {
      const f = files[0];
      setFile(f);
      const bytes = await f.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setTotalPages(pdf.getPageCount());
      setRange(`1-${pdf.getPageCount()}`);
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();
      
      // Basic range parser (e.g. "1-3" or "1")
      const parts = range.split('-').map(p => parseInt(p.trim()));
      let start = parts[0] - 1;
      let end = (parts[1] || parts[0]) - 1;

      // Clamp values
      start = Math.max(0, Math.min(start, totalPages - 1));
      end = Math.max(0, Math.min(end, totalPages - 1));

      const pagesToCopy = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      const copiedPages = await newPdf.copyPages(pdf, pagesToCopy);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nasiftools-split-${file.name}`;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUploader onFileSelect={handleFileSelect} accept=".pdf" />
      ) : (
        <div className="max-w-2xl mx-auto bg-muted/30 p-8 rounded-3xl border space-y-8">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center text-primary border border-primary/20">
               <p className="text-xl font-black">{totalPages}</p>
               <p className="text-[8px] uppercase font-bold tracking-widest">Pages</p>
            </div>
            <div>
              <p className="font-bold text-lg truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-muted-foreground uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs uppercase font-bold tracking-widest opacity-50">Page Range (e.g. 1-2 or 3)</Label>
            <div className="flex gap-4">
              <Input 
                value={range} 
                onChange={(e) => setRange(e.target.value)} 
                className="h-12 rounded-xl text-lg font-bold"
                placeholder="1-5"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setFile(null)} className="h-14 rounded-2xl px-6">Change</Button>
            <Button onClick={splitPdf} disabled={loading} className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Scissors className="mr-2 h-5 w-5" />}
              Split & Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
