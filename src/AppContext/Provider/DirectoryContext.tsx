import { createContext } from 'react'; // Dispatch, SetStateAction

interface DirectoryContextInterface {
  page: number;
}

export const DirectoryContext = createContext<DirectoryContextInterface>({
  page: 0,
});

export default DirectoryContext;
