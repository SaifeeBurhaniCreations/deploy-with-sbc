
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  FolderPlus, 
  Search, 
  Grid3X3, 
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { MockBackendService, FileNode } from '@/data/mockBackend';
import BreadcrumbNav from '@/components/files/BreadcrumbNav';
import FileCard from '@/components/files/FileCard';
import FileUploadDialog from '@/components/files/FileUploadDialog';
import CreateFolderDialog from '@/components/files/CreateFolderDialog';
import { toast } from '@/components/ui/sonner';

type SortOption = 'name' | 'date' | 'size' | 'type';
type ViewMode = 'grid' | 'list';

const Files = () => {
  const [fileStorage, setFileStorage] = useState<FileNode>(MockBackendService.getFileStorage());
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  const getCurrentFolder = (): FileNode | null => {
    const findFolder = (node: FileNode, path: string): FileNode | null => {
      if (node.path === path) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findFolder(child, path);
          if (found) return found;
        }
      }
      return null;
    };

    return findFolder(fileStorage, currentPath);
  };

  const currentFolder = getCurrentFolder();
  const currentFiles = currentFolder?.children || [];

  const filteredAndSortedFiles = currentFiles
    .filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleFileDoubleClick = (file: FileNode) => {
    if (file.type === 'folder') {
      setCurrentPath(file.path);
    } else {
      toast(`Opening ${file.name}.${file.extension}`);
    }
  };

  const handleUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      MockBackendService.uploadFile(currentPath, {
        name: file.name,
        size: file.size,
        type: file.type
      });
      toast(`Uploaded ${file.name}`);
    });
    
    setFileStorage(MockBackendService.getFileStorage());
  };

  const handleCreateFolder = (name: string) => {
    MockBackendService.createFolder(currentPath, name);
    setFileStorage(MockBackendService.getFileStorage());
    toast(`Created folder "${name}"`);
  };

  const handleRename = (file: FileNode, newName: string) => {
    MockBackendService.renameFile(file.path, newName);
    setFileStorage(MockBackendService.getFileStorage());
    toast(`Renamed to "${newName}"`);
  };

  const handleDelete = (file: FileNode) => {
    MockBackendService.deleteFile(file.path);
    setFileStorage(MockBackendService.getFileStorage());
    toast(`Deleted ${file.name}`);
  };

  const handleSort = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">File Manager</h1>
          <p className="text-slate-600">Manage your files and folders</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsCreateFolderOpen(true)}
            className="flex items-center gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
          <Button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-lg">Files</CardTitle>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <BreadcrumbNav currentPath={currentPath} onNavigate={handleNavigate} />
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort('name')}
              className={`${sortBy === 'name' ? 'text-blue-600' : ''}`}
            >
              Name
              {sortBy === 'name' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort('date')}
              className={`${sortBy === 'date' ? 'text-blue-600' : ''}`}
            >
              Date
              {sortBy === 'date' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort('size')}
              className={`${sortBy === 'size' ? 'text-blue-600' : ''}`}
            >
              Size
              {sortBy === 'size' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>
          
          {filteredAndSortedFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? 'No files match your search.' : 'This folder is empty.'}
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-2'
            }>
              {filteredAndSortedFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onDoubleClick={() => handleFileDoubleClick(file)}
                  onRename={(newName) => handleRename(file, newName)}
                  onDelete={() => handleDelete(file)}
                  onPreview={() => toast(`Preview ${file.name}`)}
                  onDownload={() => toast(`Download ${file.name}`)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <FileUploadDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
      
      <CreateFolderDialog
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
};

export default Files;
