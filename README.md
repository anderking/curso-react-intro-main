# 📝 React TODO App - Arquitectura Profesional

Este proyecto es una SPA (Single Page Application) desarrollada con **React 18**. El enfoque principal no fue solo la funcionalidad, sino la implementación de patrones de diseño escalables, principios de ingeniería de software y una arquitectura modular preparada para el crecimiento hacia un sistema empresarial.

## 🚀 Decisiones de Arquitectura

Para este proyecto, se aplicaron los siguientes patrones para garantizar un código limpio y mantenible:

### 1. Gestión de Estado con Context API
Se centralizó la lógica de negocio en un `TodoProvider`. Esto permite que cualquier componente acceda a los datos sin necesidad de *Prop Drilling*, facilitando la escalabilidad y manteniendo una única fuente de verdad.

### 2. Persistencia y Custom Hooks (Capa de Infraestructura)
Se aplicó el principio de responsabilidad única creando el hook `useLocalStorage`. Este actúa como una capa de abstracción de datos (similar a un Repository Pattern), permitiendo que la UI sea agnóstica a la implementación de la persistencia.

### 3. React Portals para Modales
Para el formulario de creación, se utilizó `createPortal`. Esto permite renderizar el modal en un nodo del DOM independiente, evitando problemas de herencia de estilos CSS (`z-index`, `overflow`) del contenedor principal.

### 4. UI/UX: Estados de Carga (Skeletons)
Se implementó un componente `ListSkeletonLoading` con animaciones CSS (shimmer effect) para mejorar la experiencia de usuario percibida durante la sincronización de datos, evitando saltos bruscos en la interfaz.

### 5. Inversión de Control con Composición y Render Props
Se utilizaron patrones avanzados de composición para desacoplar componentes. El listado principal (`ListContainer`) es un componente genérico que gestiona estados de carga y error, delegando el renderizado de los items específicos mediante **Render Props**, lo que maximiza la reutilización.

### 6. Manejo Profesional del Estado con `useReducer`
Se evolucionó la gestión del estado mediante el hook `useReducer`, implementando un **Reducer Object**. Esta arquitectura permite un flujo de datos predecible y atómico, eliminando actualizaciones de estado desincronizadas y centralizando la lógica de transiciones.

### 7. Arquitectura Orientada a Características (Feature-First)
Se migró de una estructura plana a una organización por dominios de negocio. Los componentes y lógica específica se agrupan en `features/`, mientras que los componentes transversales residen en `components/`. Esto facilita la mantenibilidad y prepara la aplicación para una integración futura con Micro-frontends o módulos independientes (ej. Módulo de Usuarios).

## 🛠️ Stack Técnico

* **Framework:** React 18
* **Arquitectura:** Feature-Based Architecture / Modular Design
* **Gestión de Estado:** Context API & `useReducer` (Pattern Dispatch/Action)
* **Patrones:** Render Props, Component Composition, Provider Pattern, Portal Pattern
* **Persistencia:** LocalStorage con Sincronización entre Pestañas (Storage Event)
* **Estilos:** CSS3 (Variables globales, Flexbox, Animaciones)
* **Productividad:** Absolute Imports (Configuración de `jsconfig.json`)

## 📦 Estructura de Carpetas

```text
src/
├── api/            # Abstracción de servicios externos (Futuros clientes API).
├── app/            # Orquestador global y punto de entrada (App.js).
├── assets/         # Recursos estáticos (Imágenes, SVGs, Iconos).
├── components/     # Componentes SHARED (Transversales a toda la App).
│   ├── Layaout/    # Estructuras de página (MainLayout, HeaderLayout).
│   └── UI/         # Componentes base reutilizables (Modales, Skeletons, Inputs).
├── features/       # Módulos de dominio (Lógica de Negocio).
│   └── todos/      # Componentes, Hooks y Contexto específicos del dominio Todo.
├── hooks/          # Hooks globales de infraestructura (LocalStorage, Listeners).
├── pages/          # Orquestadores de vistas (Puntos de entrada para la navegación).
└── utils/          # Utilidades puras (Formatters, Validators).