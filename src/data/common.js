import axios from 'axios';
export const HTTP = axios.create({
    baseURL: `http://192.168.99.100:8000/api/`
})