import { useEffect, useReducer } from "react";

/**
 * Action Types: Diccionario de constantes para evitar errores de dedo (typos).
 */
const actionTypes = {
  change: "CHANGE",   // Se disparó cuando detectamos el evento 'storage' externo.
  confirm: "CONFIRM", // Se disparó cuando el usuario acepta sincronizar la UI.
};

/**
 * Reducer Object: Representa la "Máquina de Estados" de este Hook.
 * Este patrón mapea una acción a una transformación del estado.
 * Es una función pura: dado un estado, devuelve uno nuevo sin efectos secundarios.
 */
const reducerObject = (state) => ({
  [actionTypes.change]: {
    ...state,
    storageChange: true, // Estado: Existe una desincronización pendiente.
  },
  [actionTypes.confirm]: {
    ...state,
    storageChange: false, // Estado: La UI ya está sincronizada con el disco.
  },
});

/**
 * Reducer: El motor que procesa las acciones.
 * Si el tipo de acción no existe en el objeto, devolvemos el estado actual (fail-safe).
 */
const reducer = (state, action) => {
  return reducerObject(state)[action.type] || state;
};

/**
 * Custom Hook: useStorageListener
 * Su responsabilidad es el "Inter-Tab Communication". Escucha cambios en el 
 * LocalStorage realizados por otras instancias de la aplicación.
 */
function useStorageListener(sincronize) {
  // Inicializamos el estado compuesto. 
  // 'dispatch' es nuestro método para enviar mensajes (comandos) al reducer.
  const [state, dispatch] = useReducer(reducer, {
    storageChange: false,
  });

  const { storageChange } = state;

  // --- Action Creators ---
  // Encapsulamos el 'dispatch' en funciones semánticas para mejorar la legibilidad.
  const onChangeDetected = () => dispatch({ type: actionTypes.change });
  const onConfirmChange = () => dispatch({ type: actionTypes.confirm });

  useEffect(() => {
    /**
     * El evento 'storage' es nativo del navegador. 
     * Se activa cuando otra pestaña modifica una llave de LocalStorage de este dominio.
     */
    const onChange = (change) => {
      // Verificamos que el cambio pertenezca a nuestra "tabla" de TODOs.
      if (change.key === "TODOS_V1") {
        console.log("Evento Storage detectado: Sincronización requerida.");
        onChangeDetected(); // Notificamos a la máquina de estados.
      }
    };

    // Suscripción al bus de eventos de la ventana (Global Event Listener).
    window.addEventListener("storage", onChange);

    // Dispose Pattern: Limpiamos el evento para prevenir fugas de memoria (Memory Leaks).
    return () => window.removeEventListener("storage", onChange);
  }, []);

  /**
   * toggleShow: Fachada (Facade) que coordina dos acciones:
   * 1. Llama al callback de sincronización de datos (Lógica de Persistencia).
   * 2. Notifica al Reducer que el cambio ha sido procesado (Lógica de UI).
   */
  const toggleShow = () => {
    sincronize();     // Refresca los items en useLocalStorage.
    onConfirmChange(); // Quita el aviso de la pantalla.
  };

  return {
    storageChange,
    toggleShow,
  };
}

export { useStorageListener };