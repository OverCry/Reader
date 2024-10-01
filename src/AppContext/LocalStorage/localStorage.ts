export const cleanLocal = () => {
  localStorage.removeItem('Directory');
  localStorage.removeItem('Last');
};

export const cleanAll = () => {
  localStorage.clear();
};

export const setLastDirectory = (path: string) => {
  localStorage.setItem('Directory', path);
};
