
// Mock backend data structure
export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  extension?: string;
  createdAt: string;
  size?: number;
  children?: FileNode[];
  path: string;
}

export interface Repository {
  id: string;
  name: string;
  clonedAt: string;
  files: FileNode[];
}

// Mock file storage data
export const mockFileStorage: FileNode = {
  id: "root",
  name: "root",
  type: "folder",
  createdAt: "2024-01-01T00:00:00Z",
  path: "/",
  children: [
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      createdAt: "2024-01-15T10:30:00Z",
      path: "/Documents",
      children: [
        {
          id: "report-pdf",
          name: "Monthly Report",
          type: "file",
          extension: "pdf",
          createdAt: "2024-02-01T14:20:00Z",
          size: 2048576,
          path: "/Documents/Monthly Report.pdf"
        },
        {
          id: "presentation-pptx",
          name: "Q1 Presentation",
          type: "file",
          extension: "pptx",
          createdAt: "2024-02-05T09:15:00Z",
          size: 5242880,
          path: "/Documents/Q1 Presentation.pptx"
        }
      ]
    },
    {
      id: "media",
      name: "Media",
      type: "folder",
      createdAt: "2024-01-20T16:45:00Z",
      path: "/Media",
      children: [
        {
          id: "photo-jpg",
          name: "team-photo",
          type: "file",
          extension: "jpg",
          createdAt: "2024-02-10T11:30:00Z",
          size: 1024000,
          path: "/Media/team-photo.jpg"
        },
        {
          id: "video-mp4",
          name: "demo-video",
          type: "file",
          extension: "mp4",
          createdAt: "2024-02-12T13:45:00Z",
          size: 15728640,
          path: "/Media/demo-video.mp4"
        }
      ]
    },
    {
      id: "projects",
      name: "Projects",
      type: "folder",
      createdAt: "2024-01-10T08:00:00Z",
      path: "/Projects",
      children: []
    }
  ]
};

// Mock repositories data
export const mockRepositories: Repository[] = [
  {
    id: "client-app",
    name: "client-app",
    clonedAt: "2024-02-15T10:00:00Z",
    files: [
      {
        id: "index-js",
        name: "index",
        type: "file",
        extension: "js",
        createdAt: "2024-02-15T10:00:00Z",
        size: 2048,
        path: "/repos/client-app/index.js"
      },
      {
        id: "readme-md",
        name: "README",
        type: "file",
        extension: "md",
        createdAt: "2024-02-15T10:00:00Z",
        size: 1024,
        path: "/repos/client-app/README.md"
      },
      {
        id: "package-json",
        name: "package",
        type: "file",
        extension: "json",
        createdAt: "2024-02-15T10:00:00Z",
        size: 512,
        path: "/repos/client-app/package.json"
      }
    ]
  }
];

// Mock backend service functions
export class MockBackendService {
  private static fileStorage = JSON.parse(JSON.stringify(mockFileStorage));
  private static repositories = [...mockRepositories];

  static getFileStorage(): FileNode {
    return this.fileStorage;
  }

  static getRepositories(): Repository[] {
    return this.repositories;
  }

  static createFolder(parentPath: string, name: string): FileNode {
    const newFolder: FileNode = {
      id: `folder-${Date.now()}`,
      name,
      type: "folder",
      createdAt: new Date().toISOString(),
      path: `${parentPath}/${name}`,
      children: []
    };

    this.addFileToPath(parentPath, newFolder);
    return newFolder;
  }

  static uploadFile(parentPath: string, file: { name: string; size: number; type: string }): FileNode {
    const extension = file.name.split('.').pop() || '';
    const nameWithoutExt = file.name.replace(`.${extension}`, '');
    
    const newFile: FileNode = {
      id: `file-${Date.now()}`,
      name: nameWithoutExt,
      type: "file",
      extension,
      createdAt: new Date().toISOString(),
      size: file.size,
      path: `${parentPath}/${file.name}`
    };

    this.addFileToPath(parentPath, newFile);
    return newFile;
  }

  static deleteFile(path: string): boolean {
    return this.removeFileFromPath(path);
  }

  static renameFile(oldPath: string, newName: string): boolean {
    const file = this.findFileByPath(oldPath);
    if (file) {
      file.name = newName;
      const pathParts = oldPath.split('/');
      pathParts[pathParts.length - 1] = newName + (file.extension ? `.${file.extension}` : '');
      file.path = pathParts.join('/');
      return true;
    }
    return false;
  }

  static cloneRepository(repoUrl: string, projectName: string): Repository {
    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      name: projectName,
      clonedAt: new Date().toISOString(),
      files: [
        {
          id: `${projectName}-index`,
          name: "index",
          type: "file",
          extension: "js",
          createdAt: new Date().toISOString(),
          size: 2048,
          path: `/repos/${projectName}/index.js`
        },
        {
          id: `${projectName}-readme`,
          name: "README",
          type: "file",
          extension: "md",
          createdAt: new Date().toISOString(),
          size: 1024,
          path: `/repos/${projectName}/README.md`
        }
      ]
    };

    this.repositories.push(newRepo);
    return newRepo;
  }

  private static findFileByPath(path: string): FileNode | null {
    const findInNode = (node: FileNode, targetPath: string): FileNode | null => {
      if (node.path === targetPath) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findInNode(child, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    return findInNode(this.fileStorage, path);
  }

  private static addFileToPath(parentPath: string, newFile: FileNode): void {
    const parent = this.findFileByPath(parentPath);
    if (parent && parent.children) {
      parent.children.push(newFile);
    }
  }

  private static removeFileFromPath(path: string): boolean {
    const pathParts = path.split('/');
    const parentPath = pathParts.slice(0, -1).join('/') || '/';
    const parent = this.findFileByPath(parentPath);
    
    if (parent && parent.children) {
      const index = parent.children.findIndex(child => child.path === path);
      if (index !== -1) {
        parent.children.splice(index, 1);
        return true;
      }
    }
    return false;
  }
}
