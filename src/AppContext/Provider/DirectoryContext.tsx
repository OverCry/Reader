import { createContext, Dispatch, SetStateAction } from 'react'; // Dispatch, SetStateAction

interface DirectoryContextInterface {
  page: number;
  openNav: boolean;
  setOpenNav: Dispatch<SetStateAction<boolean>> | undefined;
  openView: boolean;
  setOpenView: Dispatch<SetStateAction<boolean>> | undefined;
  mobile?: boolean;
  landscape?: boolean;
}

export const DirectoryContext = createContext<DirectoryContextInterface>({
  page: 0,
  openNav: false,
  setOpenNav: undefined,
  openView: false,
  setOpenView: undefined,
  mobile: false,
  landscape: false,
});

export default DirectoryContext;
