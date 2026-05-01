import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileStack, X, GripVertical } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const PdfMerge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setLoading(true);
    setProgress(10);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        setProgress(10 + ((i + 1) / files.length) * 80);
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nasiftools-merged.pdf';
      link.click();
      setProgress(100);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <FileUploader onFileSelect={handleFileSelect} accept=".pdf" multiple />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-3xl border overflow-hidden">
            <div className="px-6 py-4 bg-muted/50 border-b flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <span>Files to Merge ({files.length})</span>
              <span>Reorder by Dragging (Coming Soon)</span>
            </div>
            <div className="divide-y border-muted-foreground/10">
              {files.map((file, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-bold truncate max-w-xs">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(i)} className="h-8 w-8 rounded-full text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button variant="ghost" onClick={() => setFiles([])} className="rounded-xl h-12">Clear All</Button>
            <Button 
              onClick={mergePdfs} 
              disabled={files.length < 2 || loading} 
              className="rounded-2xl h-14 px-12 font-bold text-lg shadow-xl shadow-primary/20"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileStack className="mr-2 h-5 w-5" />}
              Merge PDFs Now
            </Button>
          </div>

          {loading && (
            <div className="w-full max-w-md mx-auto space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-xs font-bold text-muted-foreground">MERGING: {Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
