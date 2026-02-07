import { useState, useEffect } from "react";

/**
 * Custom Hook: useLocalStorage
 * Actúa como un "Repository Pattern" para manejar la persistencia en el navegador.
 * Abstrae la lógica de lectura/escritura y gestiona estados de carga y sincronización.
 */
function useLocalStorage(itemName, initialValue) {
  const [items, setItems] = useState(initialValue); // Datos persistidos
  const [loading, setLoading] = useState(true); // Flag de proceso asíncrono
  const [error, setError] = useState(false); // Flag de manejo de excepciones

  // Estado de control para re-activar el useEffect (Similar a invalidar una caché)
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
        // Marcamos el estado como sincronizado con la fuente de datos
        setSincronizedItem(true);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 2000);

    // El efecto se dispara al montar el componente O cuando se pide una sincronización manual
  }, [sincronizedItem]);

  /**
   * Método: sincronize
   * Fuerza la re-ejecución del useEffect. Útil para refrescar la data
   * si hubo cambios en otras pestañas (Storage Event).
   */
  const sincronize = () => {
    setLoading(true);
    setSincronizedItem(false); // Al pasar a false, el array de dependencias del useEffect detecta el cambio
  };

  /**
   * Método: saveItem
   * Función para persistir cambios (Equivalente a un Update/SaveChanges)
   */
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
