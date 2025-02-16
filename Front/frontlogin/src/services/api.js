import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4022'
})

export default api