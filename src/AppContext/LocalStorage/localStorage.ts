export const cleanLocal = () => {
  localStorage.removeItem('Directory');
  localStorage.removeItem('LastVideo');
};

export const cleanAll = () => {
  localStorage.clear();
};

export const setLastDirectory = (path: string) => {
  localStorage.setItem('Directory', path);
};

export const setLastVideoLink = (url: string) => {
  localStorage.setItem('LastVideo', url);
};

export const getLastVideoLink = () => {
  const link: string | null = localStorage.getItem('LastVideo');
  // console.log('link', link);
  return link;
};
