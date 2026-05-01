import { LucideIcon } from 'lucide-react';

export type ToolCategory = 'Image' | 'PDF' | 'Text';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  path: string;
  seoTitle: string;
  seoDescription: string;
}
