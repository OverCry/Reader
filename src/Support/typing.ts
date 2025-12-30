import { FileWithPath } from 'react-dropzone/.';

export type FileWithDeconstruction = {
  file: FileWithPath;
  path: string[];
  // upperName?: string;
  // specificName?: string;
};
