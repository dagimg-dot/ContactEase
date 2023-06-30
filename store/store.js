const user = ref(null);

export const setUser = (userData) => {
  user = userData;
};

export const getUser = () => {
  return user;
};

export const clearUser = () => {
  user = null;
};
