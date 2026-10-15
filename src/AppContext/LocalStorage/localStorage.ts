import { DEFAULT_IMAGE_WIDTH } from '@Constants';

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
  return link;
};

export const setImageWidth = (size: number) => {
  localStorage.setItem('ImageSize', size.toString());
};
export const getImageWidth = () => {
  const stringedSizing: string | null = localStorage.getItem('ImageSize');
  if (typeof stringedSizing === 'string') {
    const numberedSizing = parseInt(stringedSizing);
    if (!isNaN(numberedSizing)) {
      return numberedSizing;
    }
  }

  return DEFAULT_IMAGE_WIDTH;
};
