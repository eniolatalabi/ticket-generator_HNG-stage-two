import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage, deleteFromLocalStorage } from "../utils/storage";

const useLocalStorage = (key, initialValue) => {
  // Retrieve data from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    const item = getFromLocalStorage(key);
    return item !== null ? item : initialValue;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(key, storedValue);
  }, [key, storedValue]);

  // Delete data from localStorage
  const deleteStoredValue = () => {
    deleteFromLocalStorage(key);
    setStoredValue(initialValue); // Reset to initial value
  };

  return [storedValue, setStoredValue, deleteStoredValue];
};

export default useLocalStorage;