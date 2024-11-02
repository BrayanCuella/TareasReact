import axios from"axios";
const API_URL = 'http://localhost/laravel-api/public/api';
export const api=axios.create({
    baseURL:API_URL
});

export const headerAPI={
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    }
}