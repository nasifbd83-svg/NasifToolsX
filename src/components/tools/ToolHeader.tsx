import { Tool } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ToolHeaderProps {
  tool: Tool;
}

export const ToolHeader = ({ tool }: ToolHeaderProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <tool.icon className="h-6 w-6" />
        </div>
        <Badge variant="secondary" className="rounded-full px-4">{tool.category}</Badge>
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{tool.name}</h1>
      <p className="text-muted-foreground max-w-2xl">{tool.description}</p>
    </div>
  );
};
