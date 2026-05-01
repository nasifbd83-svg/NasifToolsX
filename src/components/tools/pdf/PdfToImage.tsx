import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileImage } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const PdfToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (files: File[]) => {
    if (files && files[0]) setFile(files[0]);
  };

  const convertPdfToImage = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context!,
          viewport: viewport,
        } as any).promise;
        
        // In a real app we might want to zip these, but for now we download first page or all
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `nasiftools-${file.name.split('.')[0]}-page-${i}.png`;
        link.click();
        
        setProgress((i / numPages) * 100);
      }
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
        <div className="max-w-2xl mx-auto bg-muted/30 p-8 rounded-3xl border space-y-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-20 bg-muted rounded-xl flex items-center justify-center text-muted-foreground border shadow-sm relative overflow-hidden">
               <FileImage className="h-8 w-8 opacity-20" />
               <div className="absolute inset-x-0 bottom-0 bg-primary h-1" />
            </div>
            <div>
              <p className="font-bold text-xl">{file.name}</p>
              <p className="text-xs text-muted-foreground uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setFile(null)} className="h-14 rounded-2xl px-6">Change File</Button>
            <Button onClick={convertPdfToImage} disabled={loading} className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileImage className="mr-2 h-5 w-5" />}
              Convert all pages to PNG
            </Button>
          </div>

          {loading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Processing Pages: {Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
