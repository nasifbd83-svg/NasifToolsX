import React, { useState } from 'react';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Loader2 } from 'lucide-react';

interface ImageConverterProps {
  from: 'JPG' | 'PNG';
  to: 'JPG' | 'PNG';
}

export const ImageConverter = ({ from, to }: ImageConverterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (files: File[]) => {
    if (files && files[0]) setFile(files[0]);
  };

  const handleConvert = () => {
    if (!file) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // If converting to JPG, fill white background for transparency
      if (to === 'JPG') {
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx?.drawImage(img, 0, 0);
      
      const mimeType = to === 'JPG' ? 'image/jpeg' : 'image/png';
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `nasiftools-${file.name.split('.')[0]}.${to.toLowerCase()}`;
          link.click();
        }
        setLoading(false);
      }, mimeType, 0.95);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUploader onFileSelect={handleFileSelect} accept={from === 'JPG' ? ".jpg,.jpeg" : ".png"} />
      ) : (
        <div className="max-w-2xl mx-auto space-y-8 text-center">
          <div className="bg-muted/30 rounded-3xl p-8 border">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black mb-2">{from}</div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">From</p>
              </div>
              <RefreshCw className="h-6 w-6 text-muted-foreground animate-spin-slow" />
              <div className="text-center">
                <div className="h-16 w-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 font-black mb-2">{to}</div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">To</p>
              </div>
            </div>
            
            <p className="text-sm font-medium mb-6">File: <span className="text-muted-foreground font-bold">{file.name}</span></p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <Button variant="outline" onClick={() => setFile(null)} className="rounded-xl h-12">Change File</Button>
               <Button onClick={handleConvert} disabled={loading} className="rounded-xl h-12 px-8 font-bold text-lg">
                 {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                 Convert to {to}
               </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
