export const setItem: (key: string, value: any) => void = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem: (key: string) => any = (key) => {
  const storage = localStorage.getItem(key);
  if (storage) {
    return JSON.parse(storage);
  }
  return null;
};
