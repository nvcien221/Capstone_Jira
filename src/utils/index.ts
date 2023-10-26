export const setLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };
  
  export const getLocalStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  
  export const removeLocalStorage = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };
  
  export const checkLocalStorage = (key: string) => {
    try {
      const token = getLocalStorage(key);
      if (!token) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const refresh = () => {
    window.location.reload();
  };
  