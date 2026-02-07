import { useEffect, useReducer } from "react";

// 1. Action Types: Definimos los nombres de las acciones.
// NOTA: Los strings en el objeto deben coincidir EXACTAMENTE con las llaves del reducerObject.
const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

// 2. Reducer Object: Define QUÉ cambiar en el estado para cada acción.
// Es una alternativa limpia al Switch. Recibe el estado actual y el payload (datos).
const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true, // Marcamos que la data ya está al día
    items: payload,
  },
  [actionTypes.save]: {
    ...state,
    items: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false, // Disparará el useEffect al cambiar a false
    loading: true,
  },
});

// 3. El Reducer: La función pura que orquesta el cambio.
// Simplemente busca en el objeto la función que corresponde al action.type.
const reducer = (state, action) => {
  // Si el tipo de acción existe en nuestro objeto, retorna el nuevo estado; si no, el actual.
  return reducerObject(state, action.payload)[action.type] || state;
};

function useLocalStorage(itemName, initialValue) {
  // 4. useReducer: Inicializamos con el estado compuesto.
  const [state, dispatch] = useReducer(reducer, {
    items: initialValue,
    loading: true,
    error: false,
    sincronizedItem: true,
  });

  // 5. Destructuring del estado para mantener compatibilidad con el resto de la App.
  const { items, loading, error, sincronizedItem } = state;

  // 6. Action Creators: Funciones que disparan el dispatch.
  // Abstraen el uso de 'dispatch' para que el código del useEffect sea más semántico.
  const onError = () => dispatch({ type: actionTypes.error }); // Corregido a minúscula para coincidir con el objeto
  const onSuccess = (item) => dispatch({ type: actionTypes.success, payload: item });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

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

        onSuccess(parsedItem);
      } catch (err) {
        onError();
      }
    }, 2000);
    // Este efecto depende de 'sincronizedItem'. Al llamar a onSincronize(),
    // este pasa a false y vuelve a disparar la lectura del LocalStorage.
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      onSave(newItem);
    } catch (err) {
      onError();
    }
  };

  const sincronize = () => onSincronize();

  return { items, saveItem, loading, error, sincronize };
}

export { useLocalStorage };
