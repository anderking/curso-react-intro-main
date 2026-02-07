import { useState, useEffect } from "react";

/**
 * Custom Hook: useStorageListener
 * Su función es escuchar eventos globales del navegador para detectar cambios 
 * realizados en el LocalStorage desde OTRAS pestañas o ventanas.
 */
function useStorageListener(sincronize) {
  // Estado que indica si hay una desincronización detectada (Aviso de "cambios pendientes")
  const [storageChange, setStorageChange] = useState(false);

  useEffect(() => {
    /**
     * Event Handler para el evento 'storage'.
     * Nota: Este evento SOLO se dispara en las pestañas que NO originaron el cambio.
     */
    const onChange = (change) => {
      if (change.key === "TODOS_V1") {
        console.log("Hubo cambios en otra pestaña");
        setStorageChange(true);
      }
    };

    // Suscripción al evento global del objeto 'window' (Como un Event AddHandler)
    window.addEventListener("storage", onChange);

    // Cleanup: Desuscripción al desmontar el componente para evitar Memory Leaks
    return () => window.removeEventListener("storage", onChange);
  }, []);

  /**
   * Método: toggleShow
   * Actúa como el puente para resolver la desincronización.
   * Ejecuta el callback 'sincronize' (que viene de useLocalStorage) y limpia el estado.
   */
  const toggleShow = () => {
    sincronize();           // Ordena a useLocalStorage que lea el disco de nuevo
    setStorageChange(false); // Oculta el mensaje de alerta en la UI
  };

  // API pública: 'show' dice SI debemos mostrar el aviso, 'toggleShow' es la ACCIÓN para arreglarlo.
  return {
    storageChange,
    toggleShow,
  };
}

export { useStorageListener };