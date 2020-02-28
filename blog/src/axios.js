import axios from 'axios';

const instance = axios.create({
    baseURL:'https://blog-monika-andrea.firebaseio.com/'
});

export default instance;
