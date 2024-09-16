# billio-frontend
Billio: Sistema automatizado para gestionar, organizar y procesar facturas electrónicas recibidas por correo. Almacena, extrae información clave, y facilita la visualización y análisis financiero con una interfaz amigable.

Primeramente para comenzar, en el frontEnd del proyecto se utilizara VUE, y Axios para comunicarse con el backEnd...

--INSTALANDO VUE--

1-Para crear el proyecto en vue se utilizo el comando:
´vue create proyecto-planes-de-negocio´

2-Luego, usaremos las siguientes caracteristicas de vue: -Babel, -Router(para las rutas de vue), Linter(Para deteccion de errores)

3-Cuando pregunte "Use history mode for router? (Requires proper server setup for index fallback in production) Yes/No" Reponderemos 'Yes'

4-Para poder visualizar el proyecto utilizaremos el comando
´vue serve´

--INSTALANDO AXIOS--
1-Acceder a la ruta del proyecto, por ejemplo
´C:\Users\usuariox\OneDrive\Documentos\GitHub\taskify-frontend\proyecto-planes-de-negocio>´

2-Para instalar axios se ejecutara el siguiente comando
´npm install axios´

2.1-En Caso que ya se encuentre instalado, instalar las dependencias del proyecto en package.json utilizando
´npm install´

--INSTALANDO SWEETALERT2--
1-Para instalr SweetAlert2 ejecutaremos el siguiente comando
´npm i sweetalert2´

2-Para su utilizacion, iremos a donde lo queremos utilizar, por ejemplo en App.vue, nos tendremos que ir a la
parte de Script, y ahi lo importaremos o llamaremos con el siguiente comando
´import Swal from 'sweetalert2';´
y simplemente para comanzar a usarlo, lo invocamos con 'Swal.fire', y luego las propiedades del mensaje por ejemplo:
'
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})
'

--Dependencias para el FrontEnd--
1- Se utilizara la siguiente biblioteca de iconos.
´npm install lucide-vue-next´
