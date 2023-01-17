import axios, {AxiosHeaders} from 'axios';

export const API_PORT = 7000;

export const API_PROTOCOL = 'http';

export const API_HOST = 'localhost';

export const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/`;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  (config.headers as AxiosHeaders & {Authorization: string})
    .Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;

    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}auth/refresh`,
        withCredentials: true
      });
      localStorage.setItem('token', response.data.data);
      return api.request(originalRequest);
    } catch (e) {
      console.error('error');
    }
  }
  throw error;
})

export default api;
