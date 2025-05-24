
import React from 'react';
import { 
  File, 
  Folder, 
  FileText, 
  Image, 
  Video, 
  FileCode, 
  FileSpreadsheet,
  FileImage,
  Music,
  Archive,
  FileType
} from 'lucide-react';

interface FileIconProps {
  type: 'file' | 'folder';
  extension?: string;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ type, extension, className = "h-6 w-6" }) => {
  if (type === 'folder') {
    return <Folder className={`text-blue-500 ${className}`} />;
  }

  const getFileIcon = (ext?: string) => {
    if (!ext) return <File className={`text-gray-500 ${className}`} />;

    const lowerExt = ext.toLowerCase();
    
    // Images
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(lowerExt)) {
      return <FileImage className={`text-green-500 ${className}`} />;
    }
    
    // Videos
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'].includes(lowerExt)) {
      return <Video className={`text-red-500 ${className}`} />;
    }
    
    // Audio
    if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'].includes(lowerExt)) {
      return <Music className={`text-purple-500 ${className}`} />;
    }
    
    // Documents
    if (['pdf', 'doc', 'docx', 'rtf'].includes(lowerExt)) {
      return <FileText className={`text-red-600 ${className}`} />;
    }
    
    // Spreadsheets
    if (['xls', 'xlsx', 'csv'].includes(lowerExt)) {
      return <FileSpreadsheet className={`text-green-600 ${className}`} />;
    }
    
    // Code files
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs', 'swift'].includes(lowerExt)) {
      return <FileCode className={`text-blue-600 ${className}`} />;
    }
    
    // Web files
    if (['html', 'css', 'scss', 'sass', 'less'].includes(lowerExt)) {
      return <FileCode className={`text-orange-500 ${className}`} />;
    }
    
    // Config files
    if (['json', 'xml', 'yaml', 'yml', 'toml', 'ini', 'conf'].includes(lowerExt)) {
      return <FileType className={`text-yellow-600 ${className}`} />;
    }
    
    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(lowerExt)) {
      return <Archive className={`text-orange-600 ${className}`} />;
    }
    
    // Text files
    if (['txt', 'md', 'log'].includes(lowerExt)) {
      return <FileText className={`text-gray-600 ${className}`} />;
    }
    
    return <File className={`text-gray-500 ${className}`} />;
  };

  return getFileIcon(extension);
};

export default FileIcon;
