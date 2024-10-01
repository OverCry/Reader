import { createContext, Dispatch, SetStateAction } from 'react'; // Dispatch, SetStateAction

interface DirectoryContextInterface {
  page: number;
  openNav: boolean;
  setOpenNav: Dispatch<SetStateAction<boolean>> | undefined;
  mobile?: boolean;
  landscape?: boolean;
}

export const DirectoryContext = createContext<DirectoryContextInterface>({
  page: 0,
  openNav: false,
  setOpenNav: undefined,
  mobile: false,
  landscape: false,
});

export default DirectoryContext;
