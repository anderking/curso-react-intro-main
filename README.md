# 📝 React TODO App - Arquitectura Profesional

Este proyecto es una SPA (Single Page Application) desarrollada con **React 18** para la gestión de tareas. El enfoque principal no fue solo la funcionalidad, sino la implementación de patrones de diseño escalables y principios de ingeniería de software.



## 🚀 Decisiones de Arquitectura

Para este proyecto, se aplicaron los siguientes patrones para garantizar un código limpio y mantenible:

### 1. Gestión de Estado con Context API
Se centralizó la lógica de negocio en un `TodoProvider`. Esto permite que cualquier componente acceda a los datos sin necesidad de *Prop Drilling*, facilitando la escalabilidad si se añaden más funcionalidades.

### 2. Persistencia y Custom Hooks (SOLID)
Se aplicó el principio de responsabilidad única creando el hook `useLocalStorage`. Este actúa como una capa de abstracción de datos (similar a un Repository Pattern), permitiendo que la UI no sepa cómo ni dónde se guardan los datos.

### 3. React Portals para Modales
Para el formulario de creación, se utilizó `createPortal`. Esto permite renderizar el modal en un nodo del DOM independiente, evitando problemas de herencia de estilos CSS (`z-index`, `overflow`) del contenedor principal.

### 4. UI/UX: Estados de Carga (Skeletons)
En lugar de un simple texto de "Cargando", se implementó un componente `TodoLoading` con animaciones CSS (shimmer effect) para mejorar la experiencia de usuario percibida durante la sincronización de datos.

### 5. Optimización con Composición y Render Props
Se implementó el principio de **Inversión de Control (IoC)** para desacoplar los componentes de la lógica de negocio. Al utilizar **Composición**, componentes como el Header se volvieron agnósticos al estado, permitiendo una mayor flexibilidad. Además, mediante **Render Props/Functions**, convertimos el listado principal en un componente genérico capaz de gestionar estados de carga y error de forma centralizada, delegando el renderizado de los items específicos al componente padre.

### 6. Manejo Profesional del Estado con `useReducer`
Se evolucionó la gestión del estado mediante el hook `useReducer`, implementando un **Reducer Object** para centralizar las transiciones de los Custom Hooks. Esta arquitectura permite un flujo de datos más predecible y escalable, eliminando actualizaciones de estado desincronizadas. Al emplear **Action Creators**, se logró un código más declarativo y fácil de testear, separando las acciones del usuario de la lógica de transformación del estado.

## 🛠️ Stack Técnico

* **Framework:** React 18
* **Gestión de Estado:** Context API
* **Hooks:** `useState`, `useEffect`, `useContext`, `useMemo`
* **Persistencia:** LocalStorage (Serialización JSON)
* **Estilos:** CSS3 (Variables globales, animaciones y diseño responsivo)
* **Productividad:** Absolute Imports (Configuración de `jsconfig.json`)

## 📦 Estructura de Carpetas

```text
src/
├── app/              # Contenedores principales (App y AppUI)
├── components/       # Componentes atómicos reutilizables
├── context/          # Definición y lógica del Provider global
├── hooks/            # Hooks personalizados para lógica compartida
└── App.css           # Estilos globales y variables de color