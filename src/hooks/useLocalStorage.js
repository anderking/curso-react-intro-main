import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  const [items, setItems] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItems(parsedItem);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 2000);
  }, [itemName, initialValue]);

  const saveItem = (newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setItems(newItem);
    } catch (err) {
      setError(true);
    }
  };

  return {
    items,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };
