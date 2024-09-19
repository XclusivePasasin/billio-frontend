import api from './Api';

export default {
    getUser(credentials) {
        return api.post('users/get_user', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    },
}