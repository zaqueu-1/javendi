import axios from 'axios';

const fetchDb = axios.create({
    //baseURL: '',
    baseURL: '//localhost:9001/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default fetchDb;