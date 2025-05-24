
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ currentPath, onNavigate }) => {
  const pathParts = currentPath.split('/').filter(part => part !== '');
  
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathParts.map((part, index) => ({
      name: part,
      path: '/' + pathParts.slice(0, index + 1).join('/')
    }))
  ];

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(crumb.path)}
            className={`px-2 py-1 h-auto font-normal ${
              index === breadcrumbs.length - 1 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {index === 0 ? (
              <Home className="h-4 w-4" />
            ) : (
              crumb.name
            )}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
