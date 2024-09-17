import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:5000/users',  // Asegúrate de que esta URL sea correcta
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
