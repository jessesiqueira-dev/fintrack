import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
})
export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
})
protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }
  request.headers['Authorization'] = `Bearer ${accessToken}`
  return request
})
