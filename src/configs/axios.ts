import axios from"axios";
const API_URL = 'http://localhost/backend-api/public/api/';
export const api=axios.create({
    baseURL:API_URL
});

export const headerAPI={
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    }
}