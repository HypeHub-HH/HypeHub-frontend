import axios from 'axios';

const authorizedApi = axios.create({
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
        const tokens = {
          accessToken: localStorage.getItem('ACCESS_TOKEN'),
          refreshToken: localStorage.getItem('REFRESH_TOKEN'),
        };
        const response = await authorizedApi.post('/Authentication/RefreshToken', tokens);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
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
