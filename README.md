
# Billio-Frontend
Billio: Sistema automatizado para gestionar, organizar y procesar facturas electrónicas recibidas por correo. Almacena, extrae información clave, y facilita la visualización y análisis financiero con una interfaz amigable.

## Instalación y Configuración del Entorno Frontend

### Prerrequisitos
Para desarrollar el frontend del proyecto **Billio**, se utiliza **Vue.js** como framework principal y **Axios** para la comunAicación con el backend.

### 1. Instalación de Vue.js

Si aún no tienes instalado Vue CLI, instálalo con el siguiente comando:

```bash
npm install -g @vue/cli
```

### 2. Creación del Proyecto Vue

Para crear el proyecto, utiliza el siguiente comando:

```bash
vue create billio-frontend
```

Selecciona las siguientes características durante la creación del proyecto:
- **Babel**
- **Router** (para manejar las rutas dentro del proyecto)
- **Linter** (para detectar errores y aplicar buenas prácticas)

Cuando aparezca la pregunta "Use history mode for router? (Requires proper server setup for index fallback in production)", responde con `Yes`.

### 3. Inicialización y Visualización del Proyecto

Para iniciar el servidor de desarrollo y visualizar el proyecto en tu navegador, usa el siguiente comando:

```bash
npm run serve
```

### 4. Instalación de Axios

Accede al directorio del proyecto y ejecuta el siguiente comando para instalar Axios, que se usará para realizar solicitudes HTTP al backend:

```bash
npm install axios
```

Si ya tienes Axios instalado, asegúrate de instalar todas las dependencias listadas en el archivo `package.json` con:

```bash
npm install
```

### 5. Instalación de SweetAlert2

**SweetAlert2** se utilizará para mostrar alertas y mensajes interactivos. Instálalo con:

```bash
npm install sweetalert2
```
###  Instalación de JSONEditor

```bash
npm install @json-editor/json-editor
```

Para utilizarlo en tu proyecto, importa la biblioteca en los componentes donde lo necesites, por ejemplo, en `App.vue`:

```js
import Swal from 'sweetalert2';
```

Para mostrar una alerta, usa la siguiente estructura:

```js
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
});
```

### 6. Instalación de Iconos

Se utilizará la biblioteca de iconos **Lucide Vue Next**. Instálala con:

```bash
npm install lucide-vue-next
```

### 7. Instalación de Dependencias del Proyecto

Si has clonado el repositorio del proyecto, asegúrate de instalar todas las dependencias necesarias ejecutando:

```bash
npm install
```
### 8. Recursos de Frontend

El proyecto **Billio** utiliza recursos como imágenes, archivos de CSS y JavaScript para la creación de la interfaz de usuario.

```bash
Colors:
https://tailwindcss.com/docs/customizing-colors
```
```bash
Iconos:
https://lucide.dev/icons/
```

---

¡Con estos pasos, tendrás el frontend de Billio configurado y listo para trabajar!
