import React, { useCallback } from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
}

export const FileUploader = ({ onFileSelect, accept = '*', multiple = false, maxSize = 10 }: FileUploaderProps) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(Array.from(e.dataTransfer.files));
    }
  }, [onFileSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(Array.from(e.target.files));
    }
  }, [onFileSelect]);

  return (
    <div 
      className={cn(
        "relative rounded-3xl border-2 border-dashed transition-all duration-300 p-12 text-center",
        dragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 bg-muted/10 hover:bg-muted/20"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 rounded-2xl bg-primary/10 text-primary">
          <Upload className="h-8 w-8" />
        </div>
        <div>
          <p className="text-xl font-bold">Drag and drop files here</p>
          <p className="text-sm text-muted-foreground mt-1">or click to browse from your computer</p>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground pt-4">
          Max File Size: {maxSize}MB | Accepts: {accept.replace(/\./g, '').toUpperCase()}
        </div>
      </div>
    </div>
  );
};
