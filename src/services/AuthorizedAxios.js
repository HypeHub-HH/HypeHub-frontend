import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

const authorizedApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authorizedApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authorizedApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401) {
      try {
        const response = await authorizedApi.post('/Authentication/RefreshToken', {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          refreshToken: localStorage.getItem('REFRESH_TOKEN'),
        });
        const accessToken = response.data;
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        return authorizedApi(originalConfig);
      } catch (_error) {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default authorizedApi;
