// import IsMobile from '@GenericFunctions';
import { createContext, Dispatch, SetStateAction } from 'react'; // Dispatch, SetStateAction

// const [isMobile, isLandscape] = IsMobile()

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
  mobile: false, //isMobile,
  landscape: false, //isLandscape
});

export default DirectoryContext;
