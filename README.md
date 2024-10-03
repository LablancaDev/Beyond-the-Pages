
# Proyecto: Beyond the Pages - Librería Online

Este proyecto es una librería online que permite a los usuarios explorar, seleccionar y comprar libros. El proyecto sigue en desarrollo, pero ya están disponibles varias funcionalidades clave, como el registro de usuarios, inicio de sesión, carrito de compras y más. Además, se está mejorando constantemente tanto la lógica del negocio como la optimización del código y diseño.

## Ver el Proyecto

<<<<<<< HEAD
Puedes ver la versión actual del proyecto desplegado en [Beyond the Pages](https://beyond-the-pages-kporvhnyh-davids-projects-5a52dd2e.vercel.app/).
||||||| 914e235
Puedes ver el proyecto desplegado en [este enlace](https://beyound-the-pages.vercel.app/).
=======
Puedes ver el proyecto desplegado en [este enlace](https://beyond-the-pages-kporvhnyh-davids-projects-5a52dd2e.vercel.app/). 
>>>>>>> 1711d05abce4b06ceda8f19863e617ea4eab61e9

## Estado del Proyecto

🚧 **En Proceso de Desarrollo** 🚧  
Este proyecto está en constante evolución. Aunque varias de las principales funcionalidades ya están operativas, se están implementando mejoras tanto a nivel de código como de diseño.

## Funcionalidades Principales

- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse, iniciar sesión, y gestionar sus perfiles, incluyendo la posibilidad de subir una foto de perfil.
- **Carrito de Compras**: Los usuarios pueden agregar libros al carrito y proceder a realizar compras.
- **Exploración de Libros**: Navegación por el catálogo de libros disponible, con opciones de búsqueda y filtrado.
- **Backend**: Arquitectura basada en el modelo vista controlador (MVC), soportado por Node.js y Express.
- **Base de Datos**: Gestión de usuarios, libros y el carrito de compras a través de MongoDB.
- **Despliegue**: Vercel ha sido utilizado para el despliegue de la aplicación en producción, con soporte para configuraciones avanzadas de entornos.

## Tecnologías Utilizadas

### **Frontend:**
- **React**: Utilizado para construir las interfaces de usuario, manejando los estados y la interacción en tiempo real con el servidor.
- **Redux Toolkit**: Implementado para gestionar el estado global de la aplicación, facilitando la manipulación de datos como el carrito y la autenticación de usuarios.
- **React Router DOM**: Permite la navegación fluida entre las diferentes vistas de la aplicación.
- **Bootstrap**: Se ha implementado para un diseño responsive y coherente en todos los dispositivos.
- **Axios**: Utilizado para realizar solicitudes HTTP al servidor, facilitando la comunicación entre frontend y backend.
- **Hooks de React**: 
  - **useState**: Para gestionar estados locales.
  - **useEffect**: Para controlar efectos secundarios, como la carga inicial de datos desde la API.
  - **useNavigate**: Para manejar la navegación programática dentro de la aplicación.
  - **useSelector** y **useDispatch**: Para interactuar con el estado global gestionado por Redux.
- **Vite**: Utilizado para un entorno de desarrollo rápido y eficiente, con soporte para Hot Module Replacement (HMR).

### Consumo de API Externa

La aplicación consume datos de libros a través de la **API de Google Books**, lo que permite obtener información como títulos, categorías, y portadas de una gran variedad de libros. Las peticiones a esta API se realizan desde el **backend** utilizando el servidor de Node.js y Express. Al realizar las solicitudes desde el backend, se evita exponer la API directamente en el frontend, mejorando la seguridad y permitiendo la manipulación y procesamiento de los datos antes de enviarlos al cliente.

- **Datos obtenidos**: Títulos, categorías, portadas y precios (inventados para la tienda).
- **Resultados por página**: La API permite obtener hasta 40 libros por solicitud, y se implementa paginación en el servidor para manejar grandes volúmenes de datos.
- **Enriquecimiento de datos**: Se genera un precio aleatorio para cada libro, ya que esta información no está disponible en la respuesta de la API.

Esta integración mejora la experiencia del usuario al permitir la visualización de una amplia variedad de libros sin necesidad de almacenar la información localmente en la base de datos.


### **Backend:**
- **Node.js**: Servidor de backend que gestiona las peticiones de la API y se comunica con la base de datos.
- **Express**: Framework ligero utilizado para crear rutas y manejar las peticiones HTTP, siguiendo una arquitectura basada en MVC.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar datos de usuarios y productos.
- **Mongoose**: ODM (Object Data Modeling) utilizado para interactuar con MongoDB y definir los esquemas de los datos.
- **TypeScript**: Utilizado tanto en el frontend como en el backend para una mayor robustez y mantenimiento del código.
- **Control de Errores y Autenticación**: Implementado middleware para manejar errores y autenticación con JWT (JSON Web Tokens).

### **Despliegue:**
- **Vercel**: El proyecto está desplegado en Vercel, utilizando las siguientes configuraciones clave:
  - **vercel.json**: Archivo de configuración que define las rutas y redirecciones necesarias para el correcto funcionamiento del proyecto en Vercel.
  - **vite.config.ts**: Configuración para Vite, incluyendo la optimización del bundle y las rutas necesarias.
  - **Configuración del entorno**: Variables de entorno utilizadas para manejar URLs del backend y credenciales sensibles.
  - **Despliegue Automático**: Vercel gestiona el despliegue automático cada vez que se realiza un `push` a la rama de producción (master).

### **Otras Tecnologías y Funcionalidades:**
- **CORS (Cross-Origin Resource Sharing)**: Configurado correctamente para evitar problemas al realizar peticiones entre el frontend y el backend.
<!-- - **JWT (JSON Web Tokens)**: Implementado para la autenticación segura de usuarios en el backend. -->
- **API REST**: Desarrollada para gestionar la lógica de negocio y la interacción con la base de datos, facilitando operaciones CRUD para usuarios y libros.
- **Enrutado Dinámico en Express**: Las rutas para manejar el carrito de compras, autenticación, y gestión de perfiles de usuario están organizadas según la arquitectura MVC.
  

## Próximos Pasos

- **Optimización del código**: Refactorización de la lógica para mejorar el rendimiento.
- **Mejoras en el diseño**: Implementación de un diseño más avanzado, ajustando la experiencia de usuario para hacerla más atractiva y funcional.
- **Implementación de nuevas funcionalidades**: Añadir más funcionalidades a la tienda, como reviews de libros, wishlist, y seguimiento de pedidos.


Si has llegado hasta aquí muchísimas gracias por tu tiempo e interés 😊 el proyecto seguirá en crecimiento! 🚀✨