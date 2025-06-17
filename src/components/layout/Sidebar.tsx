import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  title?: string;
  children: React.ReactNode; // For filter components like Input, Checkbox, RadioGroup, Slider
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title = "Filters", children, className }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-72 lg:w-80 space-y-6 p-4 border-r border-gray-200 ${className}`}>
      {title && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <Separator className="my-4" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height as needed */}
        <div className="space-y-6">
          {children ? children : <p className="text-sm text-gray-500">No filters available.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;