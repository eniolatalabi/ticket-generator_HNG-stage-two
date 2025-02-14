// Save data to localStorage
export const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };
  
  // Retrieve data from localStorage
  export const getFromLocalStorage = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };
  
  // Delete data from localStorage
  export const deleteFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error deleting from localStorage:", error);
    }
  };