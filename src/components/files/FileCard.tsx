
import React, { useState } from 'react';
import { FileNode } from '@/data/mockBackend';
import FileIcon from './FileIcon';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Download, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface FileCardProps {
  file: FileNode;
  onDoubleClick: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
  onPreview?: () => void;
  onDownload?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({
  file,
  onDoubleClick,
  onRename,
  onDelete,
  onPreview,
  onDownload
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleRename = () => {
    if (newName.trim() && newName !== file.name) {
      onRename(newName.trim());
    }
    setIsRenaming(false);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div 
      className="group relative p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white"
      onDoubleClick={onDoubleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <FileIcon 
            type={file.type} 
            extension={file.extension} 
            className="h-8 w-8 flex-shrink-0" 
          />
          <div className="flex-1 min-w-0">
            {isRenaming ? (
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                  if (e.key === 'Escape') {
                    setIsRenaming(false);
                    setNewName(file.name);
                  }
                }}
                className="h-7 text-sm"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <div>
                <h3 className="font-medium text-gray-900 truncate">
                  {file.name}{file.extension ? `.${file.extension}` : ''}
                </h3>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>{formatDate(file.createdAt)}</div>
                  {file.size && <div>{formatFileSize(file.size)}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {file.type === 'file' && onPreview && (
              <DropdownMenuItem onClick={onPreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
            )}
            {file.type === 'file' && onDownload && (
              <DropdownMenuItem onClick={onDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FileCard;
