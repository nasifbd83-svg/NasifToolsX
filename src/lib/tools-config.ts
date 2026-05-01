import { 
  FileText, 
  Image as ImageIcon, 
  FileStack, 
  Scissors, 
  FileImage, 
  Hash, 
  Type, 
  Copy,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG and PNG images with perfect quality.',
    icon: Minimize2,
    category: 'Image',
    path: '/image-compressor',
    seoTitle: 'Online Image Compressor - Reduce Image Size Without Quality Loss',
    seoDescription: 'Compress your images instantly with our advanced online image compressor. Supports PNG, JPG, and WebP.'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension easily.',
    icon: Maximize2,
    category: 'Image',
    path: '/image-resizer',
    seoTitle: 'Online Image Resizer - Resize Images Instantly',
    seoDescription: 'Change image dimensions easily. Maintain aspect ratio or set custom width and height.'
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    description: 'Convert JPG images to PNG format instantly.',
    icon: RefreshCw,
    category: 'Image',
    path: '/jpg-to-png',
    seoTitle: 'JPG to PNG Converter - Online and Free',
    seoDescription: 'Convert your JPG images to high-quality PNG format. Simple, fast, and secure.'
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    description: 'Convert PNG images to JPG format instantly.',
    icon: RefreshCw,
    category: 'Image',
    path: '/png-to-jpg',
    seoTitle: 'PNG to JPG Converter - High Quality Conversion',
    seoDescription: 'Convert PNG files to JPG format. Fast online tool with best image quality results.'
  },
  // PDF Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Join multiple PDF files into one document.',
    icon: FileStack,
    category: 'PDF',
    path: '/merge-pdf',
    seoTitle: 'Merge PDF Files Online - Combine PDF Free',
    seoDescription: 'Combine multiple PDF files into a single document. Easy to use, no registration required.'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Separate one page or whole set for easy conversion.',
    icon: Scissors,
    category: 'PDF',
    path: '/split-pdf',
    seoTitle: 'Split PDF Online - Extract Pages from PDF',
    seoDescription: 'Split a PDF file into multiple documents or extract specific pages. Fast and secure.'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert each PDF page into a high-quality image.',
    icon: FileImage,
    category: 'PDF',
    path: '/pdf-to-image',
    seoTitle: 'PDF to Image Converter - PDF to JPG/PNG',
    seoDescription: 'Extract high-quality images from your PDF documents. Supports PNG and JPG output.'
  },
  // Text Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and lines in real-time.',
    icon: Hash,
    category: 'Text',
    path: '/word-counter',
    seoTitle: 'Word Counter Online - Real-time Character and Word Count',
    seoDescription: 'Accurately count words, characters, and spaces in your text. Perfect for writers and SEO.'
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Change text to uppercase, lowercase, sentence case, etc.',
    icon: Type,
    category: 'Text',
    path: '/case-converter',
    seoTitle: 'Text Case Converter - UPPERCASE, lowercase, Proper Case',
    seoDescription: 'Instantly convert your text between different cases. Sentence case, camelCase, PascalCase and more.'
  },
  {
    id: 'duplicate-remover',
    name: 'Duplicate Remover',
    description: 'Remove duplicate lines from your text easily.',
    icon: Copy,
    category: 'Text',
    path: '/duplicate-remover',
    seoTitle: 'Duplicate Text Remover - Clean Your Lists Fast',
    seoDescription: 'Quickly remove duplicate lines from lists or text documents. Clean up your data in seconds.'
  }
];
