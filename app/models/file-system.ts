export type FileItem = {
  name: string;
  isDirectory: boolean;
  path: string;
  size: number;
  modified: string;
};

export type PathSegment = {
  name: string;
  path: string;
};
