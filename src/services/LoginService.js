import api from './Api';

export default {
    loginUser(credentials) {
        return api.post('users/login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // Comprobamos si el usuario ingresó con correo o con nombre de usuario
            const identificador = credentials.correo_o_usuario.includes('@') ? 'correo' : 'usuario';
            
            // Guardar el correo o nombre de usuario en el Local Storage dependiendo de cómo inició sesión
            localStorage.setItem('user', JSON.stringify({
                [identificador]: credentials.correo_o_usuario
            }));
    
            return response;
        });
    },
    
    logoutUser(userId) {
        return api.post('users/logout', { id: userId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // Limpiar Local Storage después de logout
            localStorage.removeItem('user');
        });
    },
    
    
    isAuthenticated() {
        // Verificar si el usuario está en Local Storage
        const user = localStorage.getItem('user');
        return !!user;
    }
};
