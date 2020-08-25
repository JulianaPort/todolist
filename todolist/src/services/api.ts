import { environment } from './../shared/enviroments/enviroments.dev';
import axios from 'axios';

const api = axios.create({
    baseURL: environment.api_url,
});

export default api;