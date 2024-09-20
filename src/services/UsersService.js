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
}