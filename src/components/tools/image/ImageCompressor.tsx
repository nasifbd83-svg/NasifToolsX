import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, RefreshCw, Layers } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (files: File[]) => {
    if (files && files[0]) {
      setFile(files[0]);
      setCompressedFile(null);
      setProgress(0);
    }
  };

  const compressImage = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(10);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (p: number) => setProgress(p),
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      setProgress(100);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUploader onFileSelect={handleFileSelect} accept=".jpg,.jpeg,.png,.webp" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-3xl p-6 border flex flex-col items-center">
              <p className="text-xs uppercase font-bold text-muted-foreground mb-4">Original</p>
              <img src={URL.createObjectURL(file)} alt="Original" className="max-h-64 rounded-xl shadow-lg mb-4" />
              <p className="font-bold">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <div className="bg-muted/30 rounded-3xl p-6 border flex flex-col items-center justify-center">
              <p className="text-xs uppercase font-bold text-muted-foreground mb-4">Optimized</p>
              {compressedFile ? (
                <>
                  <img src={URL.createObjectURL(compressedFile)} alt="Compressed" className="max-h-64 rounded-xl shadow-lg mb-4" />
                  <p className="font-bold text-green-500">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p className="text-xs font-bold text-green-500 mt-1">
                    -{Math.round((1 - compressedFile.size / file.size) * 100)}% Smallier
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Layers className="h-12 w-12 mb-4 opacity-20" />
                  <p>Ready to optimize</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button variant="outline" onClick={() => setFile(null)} className="rounded-2xl h-14 px-8 w-full md:w-auto">
              Change Image
            </Button>
            
            {!compressedFile ? (
              <Button onClick={compressImage} disabled={loading} className="rounded-2xl h-14 px-12 w-full md:w-auto font-bold text-lg shadow-xl shadow-primary/20">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCw className="mr-2 h-5 w-5" />}
                Compress Now
              </Button>
            ) : (
              <Button onClick={download} className="rounded-2xl h-14 px-12 w-full md:w-auto font-bold text-lg bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20">
                <Download className="mr-2 h-5 w-5" />
                Download Optimized
              </Button>
            )}
          </div>

          {loading && (
            <div className="w-full max-w-md mx-auto space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-xs font-bold text-muted-foreground">PROCESSSING: {Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
