import axios from 'axios';

const url1 = 'https://javendi-backend.vercel.app/api';
const url2 = '//localhost:9001/api';

const fetchDb = axios.create({
    baseURL: url1,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default fetchDb;