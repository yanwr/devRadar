// usar o axios pq sim, mas tem uma api nativa do navegador 'fetch'. Isso serve para chamar outras APi REST
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2525'
});

export default api;