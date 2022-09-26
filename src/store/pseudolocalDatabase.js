/* 
  ==============================
  Initialize Data Section
  ==============================
*/
export const initDataPath = (path, data) => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem(path)) {
      localStorage.setItem(path, JSON.stringify(data));
    }
  }
};

/* 
  ==============================
  Get Data Section
  ==============================
*/
export const getDataPath = (path) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem(path)) {
      return JSON.parse(String(localStorage.getItem(path)));
    }
    return [] || {};
  }
};

/* 
  ==============================
  Set Data Section
  ==============================
*/
export const setDataPath = (path, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(path, JSON.stringify(data));
  }
};
