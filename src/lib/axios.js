import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
})

export default api
