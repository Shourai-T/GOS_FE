import axios from 'axios';

// ✅ Use environment variable for API URL
// Development: points to local backend (http://localhost:8000)
// Production (Docker): uses '/api' which is proxied by Nginx
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for centralized error handling and data unwrapping
apiClient.interceptors.response.use(
  (response) => {
    // ✅ Unwrap standardized API response: { success, data, message }
    if (response.data && typeof response.data.success !== 'undefined') {
      if (!response.data.success) {
        // Backend returned success: false
        throw new Error(response.data.message || 'Request failed');
      }
      // Return unwrapped data for clean service layer
      return { ...response, data: response.data.data };
    }
    // Fallback for non-standardized responses
    return response;
  },
  (error) => {
    // Pass through cancellation errors without modification
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // ✅ Extract error message from backend response if available
    const message = error.response?.data?.message || error.message || 'Có lỗi xảy ra, vui lòng thử lại.';
    
    // Create normalized error object
    const customError = new Error(message);
    Object.assign(customError, {
      status: error.response?.status,
      originalError: error
    });

    return Promise.reject(customError);
  }
);

export default apiClient;
