import axios from 'axios';

const fetchDb = axios.create({
    baseURL: 'https://javendi-backend.vercel.app/api',
    //baseURL: '//localhost:9001/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default fetchDb;