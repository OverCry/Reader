import { createContext, Dispatch, SetStateAction } from 'react'; // Dispatch, SetStateAction
import { FileWithPath } from 'react-dropzone/.';

interface DirectoryContextInterface {
  page: number;
  openNav: boolean;
  setOpenNav: Dispatch<SetStateAction<boolean>> | undefined;
  openView: boolean;
  setOpenView: Dispatch<SetStateAction<boolean>> | undefined;
  mobile?: boolean;
  landscape?: boolean;
  files: FileWithPath[] | undefined;
  setFiles: Dispatch<SetStateAction<FileWithPath[]>> | undefined;
}

export const DirectoryContext = createContext<DirectoryContextInterface>({
  page: 0,
  openNav: false,
  setOpenNav: undefined,
  openView: false,
  setOpenView: undefined,
  mobile: false,
  landscape: false,
  files: undefined,
  setFiles: undefined,
});

export default DirectoryContext;
