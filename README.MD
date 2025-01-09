
# Proyecto Pop Corn

## Resumen de Ejecución

Para iniciar el proyecto, siga los pasos a continuación:

1. **Configurar la Base de Datos**:
   - Cree una base de datos llamada `pop_corn`.

2. **Configurar Variables de Entorno**:
   - En el directorio `backend`, cree un archivo `.env` con las siguientes variables:
     ```env
     API_PORT=3000
     API_SERVER=localhost
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_db_user
     DB_PASSWORD=your_db_password
     DB_DATABASE=pop_corn
     BASE_SOCKET=http://localhost:3000
     BASE_API=http://localhost:3000/api
     ```
   - En el directorio `frontend`, cree un archivo `.env` con las siguientes variables:
     ```env
     VITE_BASE_API=http://localhost:3000/api
     VITE_BASE_SOCKET=http://localhost:3000
     ```

3. **Instalar Dependencias**:
   - En el directorio principal del proyecto, ejecute:
     ```bash
     cd backend
     npm install
     cd ../frontend
     npm install
     ```

4. **Ejecutar el Proyecto**:
   - Inicie el backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Inicie el frontend:
     ```bash
     cd frontend
     npm run dev
     ```

---

## Backend - API de Venta de Maíz 🌽

### **Descripción**
Este proyecto es el backend para un sistema de venta de maíz que utiliza tecnologías modernas como TypeScript, Node.js, Express y Socket.IO. Está diseñado para manejar la lógica de negocio, conexiones en tiempo real, y la persistencia de datos en la base de datos.

---

### **Tecnologías Usadas**
- **Node.js**: Plataforma de ejecución para JavaScript en el servidor.
- **TypeScript**: Lenguaje de programación tipado para mejorar la calidad del código.
- **Express**: Framework web minimalista para manejar rutas y middleware.
- **Socket.IO**: Comunicación en tiempo real entre cliente y servidor.
- **TypeORM**: ORM para manejar la base de datos.
- **Swagger**: Generación automática de documentación para las APIs.
- **PostgreSQL**: Base de datos relacional.
- **Jest**: Testing para las funcionalidades.

---

### **Estructura de Carpetas**

```plaintext
src/
├── config/          # Configuraciones de la base de datos y otros entornos
├── constants/       # Constantes globales para el proyecto
├── controllers/     # Controladores para manejar las rutas y lógica de negocio
├── entities/        # Entidades de la base de datos (TypeORM)
├── repositories/    # Lógica para interactuar con la base de datos
├── routes/          # Rutas de la API
├── services/        # Lógica de negocio y servicios
├── sockets/         # Manejadores de eventos de Socket.IO
├── app.ts           # Configuración principal de Express
├── server.ts        # Configuración de Socket.IO y servidor
```

---

### **Cómo Iniciar el Proyecto**

#### **1. Clonar el repositorio**
```bash
git clone https://github.com/Navau/bob-corn-base-labs
cd backend
```

#### **2. Instalar dependencias**
Asegúrate de tener `Node.js` y `npm` instalados.
```bash
npm install
```

#### **3. Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto basado en el siguiente ejemplo:
```plaintext
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=navau
DATABASE_NAME=bob_corn
API_SERVER=localhost
API_PORT=3000
```

#### **4. Generar la base de datos**
Asegúrate de tener PostgreSQL instalado y corriendo. Usa TypeORM para sincronizar las entidades:
```bash
npm run typeorm migration:run
```
#### **4. Generar la Base de Datos 🛠️**
¡Asegúrate de que PostgreSQL esté instalado y en funcionamiento! 🚀 Si encuentras problemas, crea manualmente la base de datos localmente con el nombre: `bob_corn`.


#### **5. Iniciar el servidor**
```bash
npm start
```

El backend estará corriendo en `http://localhost:3000/api`.

---

### **Descripción de Carpetas**

#### **1. config/**
Contiene configuraciones globales como la conexión a la base de datos.

#### **2. constants/**
Define constantes globales que son utilizadas en todo el proyecto.

#### **3. controllers/**
Contiene los controladores que gestionan las rutas y conectan con los servicios.

#### **4. entities/**
Define las entidades que representan las tablas de la base de datos.

#### **5. repositories/**
Contiene la lógica de interacción directa con la base de datos.

#### **6. routes/**
Define las rutas disponibles en la API.

#### **7. services/**
Implementa la lógica de negocio como validaciones, reglas de negocio, y servicios específicos.

#### **8. sockets/**
Contiene los manejadores de eventos de Socket.IO para la comunicación en tiempo real.

#### **9. app.ts**
Archivo principal para configurar middlewares, rutas y Swagger.

#### **10. server.ts**
Inicializa el servidor HTTP, conecta con Socket.IO y configura los eventos.

---

### **Swagger - Documentación**
La documentación de la API se genera automáticamente con Swagger. Una vez que el servidor esté corriendo, puedes acceder a la documentación en:
```
http://localhost:3000/api
```

---

### **Scripts Disponibles**

#### **Iniciar el servidor**
```bash
npm start
```

#### **Iniciar en modo desarrollo**
```bash
npm run dev
```

#### **Correr tests**
```bash
npm run test
```

---

### **Endpoints Disponibles**

#### **1. POST /api/corn/buy**
Registra una compra de maíz.

#### **2. GET /api/corn/paginated**
Obtiene una lista de compras paginada.

#### **3. GET /api/corn/all**
Obtiene todas las compras de un cliente específico.

#### **4. Socket.IO Eventos**
- **buyCorn**: Maneja la compra en tiempo real.

---

### **Pruebas**
Las pruebas están escritas con Jest. Para ejecutarlas:
```bash
npm test
```

---

### **Contribuciones**
Si deseas contribuir al proyecto:
1. Crea un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m "Agrega nueva funcionalidad"`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

---



# Frontend - Sistema de Compra de Maíz 🌽

## Introducción
Este es el frontend del sistema de compra de maíz que permite a los usuarios realizar compras, visualizar registros y gestionar eventos en tiempo real a través de una integración con Socket.IO. El proyecto utiliza **React** y **Vite** para la construcción del cliente, junto con **TailwindCSS** para el diseño.

---

## Tecnologías Usadas
- **React**: Biblioteca para la construcción de interfaces de usuario.
- **Vite**: Herramienta rápida para construir proyectos frontend.
- **TypeScript**: Tipado estático para mayor robustez del código.
- **TailwindCSS**: Framework de diseño CSS.
- **Socket.IO**: Comunicación en tiempo real entre cliente y servidor.
- **Zod**: Validaciones de formularios.
- **Axios**: Cliente HTTP para consumir APIs.
- **JS Cookie**: Manejo de cookies en el cliente.

---

## Estructura del Proyecto
```
src/
├── api/                # Servicios para consumir APIs
├── assets/             # Recursos estáticos como imágenes o íconos
├── components/         # Componentes reutilizables de la UI
├── constants/          # Variables y configuraciones globales
├── hooks/              # Hooks personalizados
├── interfaces/         # Definiciones de tipos e interfaces
├── lib/                # Configuración de librerías externas
├── pages/              # Vistas principales del proyecto
├── utils/              # Funciones auxiliares y helpers
├── App.tsx             # Componente principal de la aplicación
├── main.tsx            # Punto de entrada principal
├── index.css           # Estilos globales
└── vite-env.d.ts       # Configuración de Vite para TypeScript
```

---

## Instalación
1. Clonar el repositorio:
    ```bash
    git clone https://github.com/Navau/bob-corn-base-labs
    cd frontend
    ```

2. Instalar dependencias:
    ```bash
    npm install
    ```

3. Configurar variables de entorno:
    Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```env
    VITE_BASE_API=http://localhost:3000/api
    VITE_BASE_SOCKET=http://localhost:3000
    ```

4. Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

---

## Uso
### Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la versión optimizada de producción.

### Funcionalidades Principales
1. **Comprar Maíz:**
   - Los usuarios pueden realizar compras ingresando su ID en un formulario.
   - Cada compra actualiza los registros en tiempo real usando Socket.IO.

2. **Visualización de Registros:**
   - Se muestran todos los registros de compras en una tabla interactiva.
   - Incluye paginación y scroll interno.

3. **Validaciones de Formularios:**
   - Uso de `zod` para garantizar que los datos ingresados sean válidos.

4. **Integración en Tiempo Real:**
   - Comunicación bidireccional con el servidor usando Socket.IO.

---

## Directorio de Interés
### `/api`
Contiene los servicios para consumir las APIs del backend.
- `corn.api.ts`: Servicios relacionados con las operaciones de compra y obtención de registros.

### `/components`
Componentes reutilizables para la UI.
- **Custom:**
  - `FormCorn`: Formulario para realizar compras.
  - `ListBuysCorn`: Tabla para listar registros.
  - `HeaderCorn`: Cabecera principal.

### `/hooks`
Hooks personalizados para manejar la lógica del cliente.
- `useCorn`: Maneja las compras y la obtención de registros.
- `useToast`: Manejo de notificaciones.

### `/constants`
Variables y configuraciones globales.
- `corn.constants.ts`: Contiene configuraciones como el límite de compras por minuto.

---

## Consideraciones
- **Sockets:** Los eventos de compra se manejan en tiempo real a través de Socket.IO. Se inicializa el socket en el archivo `main.tsx` y se propaga a los componentes que lo necesiten.
- **Cookies:** El ID del cliente se guarda en cookies para persistencia entre sesiones.
- **TailwindCSS:** Utiliza clases utilitarias para un diseño rápido y limpio.

---

## Próximos Pasos
1. **Autenticación:** Integrar un sistema de autenticación para manejar múltiples usuarios.
2. **Optimización:** Mejorar la gestión de estado usando una librería como Zustand o Redux.
3. **Pruebas:** Implementar pruebas unitarias con Jest y React Testing Library.
4. **Despliegue:** Configurar el proyecto para ser desplegado en una plataforma como Vercel o Netlify.

---


### **Autor**
Desarrollado por JOSE MANUEL GUTIERREZ NAVARRO 🌽


