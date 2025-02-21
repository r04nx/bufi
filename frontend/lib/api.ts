import axios from 'axios'
import { config } from './config'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add axios interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'An error occurred'
    throw new Error(Array.isArray(message) ? message[0].msg : message)
  }
)

export const authApi = {
  register: async (data: any) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, data)
    return response.data
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Login API Error:', error)
      throw error
    }
  },

  createBusinessProfile: async (data: {
    business_name: string
    industry_sector: string
    business_size: string
    business_status?: string
  }) => {
    const response = await api.post('/api/business/profile', data)
    return response.data
  }
}

export const businessApi = {
  getProfile: async () => {
    const response = await api.get('/api/business/profile')
    return response.data
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/api/business/profile', data)
    return response.data
  }
}

export default api 