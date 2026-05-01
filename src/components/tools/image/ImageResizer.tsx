import React, { useState, useRef } from 'react';
import { FileUploader } from '../shared/FileUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Maximize2, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export const ImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (files: File[]) => {
    if (files && files[0]) {
      const f = files[0];
      setFile(f);
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
        setOriginalDimensions({ width: img.width, height: img.height });
        setAspectRatio(img.width / img.height);
      };
      img.src = URL.createObjectURL(f);
    }
  };

  const handleWidthChange = (w: number) => {
    if (lockAspectRatio) {
      setDimensions({ width: w, height: Math.round(w / aspectRatio) });
    } else {
      setDimensions(prev => ({ ...prev, width: w }));
    }
  };

  const handleHeightChange = (h: number) => {
    if (lockAspectRatio) {
      setDimensions({ width: Math.round(h * aspectRatio), height: h });
    } else {
      setDimensions(prev => ({ ...prev, height: h }));
    }
  };

  const handleResize = async () => {
    if (!file || !canvasRef.current) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `resized-${file.name}`;
          link.click();
        }
        setLoading(false);
      }, file.type);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUploader onFileSelect={handleFileSelect} accept=".jpg,.jpeg,.png,.webp" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-muted/30 rounded-3xl p-6 border flex flex-col items-center">
             <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-80 rounded-xl shadow-lg mb-6" />
             <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove & Change</Button>
          </div>

          <div className="space-y-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Width (PX)</Label>
                <Input 
                  type="number" 
                  value={dimensions.width} 
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)} 
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Height (PX)</Label>
                <Input 
                  type="number" 
                  value={dimensions.height} 
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)} 
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="lockRatio" 
                checked={lockAspectRatio} 
                onChange={(e) => setLockAspectRatio(e.target.checked)} 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="lockRatio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Lock Aspect Ratio (Actual: {aspectRatio.toFixed(2)})
              </label>
            </div>

            <Button onClick={handleResize} disabled={loading} className="rounded-2xl h-16 w-full font-bold text-xl shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Maximize2 className="mr-2 h-6 w-6" />}
              Resize & Download
            </Button>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
};
