import api from './Api';

export default {
    getUser() {
        return api.post('users/get_user', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    },
    get_user_by_identifier(credentials) {
        return api.post('users/get_user_login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    },
    createUser(userData) {
        return api.post('users/create_user', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    },
    updateUser(userData) {
        return api.post('users/update_user', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    },  
    deleteUser(userData) {
        return api.post('users/delete_user', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    }
};
