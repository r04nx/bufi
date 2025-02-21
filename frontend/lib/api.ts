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
  register: async (data: {
    business_name: string
    email: string
    password: string
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.detail || 'Failed to create account')
    }
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

      // Validate response format
      const data = response.data
      if (!data?.token || !data?.token_type) {
        throw new Error('Invalid response format from server')
      }

      return {
        token: data.token,
        token_type: data.token_type
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password')
      }
      console.error('Login error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.detail || 'Failed to sign in')
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
  },

  checkOnboardingStatus: async () => {
    try {
      const response = await api.get('/api/auth/onboarding-status')
      return response.data.completed
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      return false
    }
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

export const onboardingApi = {
  completeOnboarding: async (data: {
    business_name: string;
    phone: string;
    industry_sector: string;
    business_size: string;
  }) => {
    try {
      const response = await api.post('/api/onboarding/complete', data);
      return response.data;
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      throw new Error(error.response?.data?.detail || 'Failed to complete onboarding');
    }
  }
};

export default api 