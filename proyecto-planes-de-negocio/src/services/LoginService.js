import api from './Api';

export default {
    loginUser(credentials) {
        return api.post('/login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
