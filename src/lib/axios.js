import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

const baseURL = 'https://fullstackclub-finance-dashboard-api.onrender.com/api'

export const publicApi = axios.create({
  baseURL,
  timeout: 10000,
})

export const protectedApi = axios.create({
  baseURL,
  timeout: 10000,
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
})
