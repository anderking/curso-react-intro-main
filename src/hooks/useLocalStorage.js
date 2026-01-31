import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  const [items, setItems] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sincronizedItem, setSincronizedItem] = useState(true);

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
        setSincronizedItem(true);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 2000);
  }, [sincronizedItem]);

  const sincronize = () => {
    setLoading(true);
    setSincronizedItem(false);
  };

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
    sincronize,
  };
}

export { useLocalStorage };
