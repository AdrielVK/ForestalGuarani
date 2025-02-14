import axios, { InternalAxiosRequestConfig } from 'axios';
import { SnackbarUtilities } from '../utils/snackbar-manager';
import { getValidationError } from '../utils/get-validation-error';

// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const Interceptor = () => {
  const updateHeader = (request: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (request.headers) {
      request.headers.set('Authorization', `Bearer ${token}`);
      request.headers.set('Content-Type', 'application/json');
    }

    
    return request;
  };
  
  api.interceptors.response.use(
    (respose) => {
      const msg = respose?.data?.payload?.message;
      if(msg){
        SnackbarUtilities.success(msg);
      }
      return respose
    },
    (error) => {
      if (error.status !== 401){
        const msg: string | null = error.response.data.message || null
        console.log("error response", error)
        SnackbarUtilities.error(getValidationError(error.code, msg))
      }
          
      
      return Promise.reject(error)
    }
  )
  
  api.interceptors.request.use((request) => {
    return updateHeader(request);
  });
};
