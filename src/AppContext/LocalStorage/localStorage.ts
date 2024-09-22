export const cleanLocal = () => {
  localStorage.removeItem('Directory');
  localStorage.removeItem('Last');
};

export const cleanAll = () => {
  localStorage.clear();
};
