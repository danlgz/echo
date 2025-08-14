import axios from 'axios';
import Cookies from 'js-cookie';
import type { CookieAttributes } from 'node_modules/@types/js-cookie';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
const API_HOST = import.meta.env.PUBLIC_API_HOST;
const BASE_API_URL = `${API_HOST}/api/v1`;

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getAuthToken() {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
}

function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
}

export function saveTokens(accessToken: string, refreshToken: string) {
  const opts = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  } satisfies CookieAttributes;

  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, opts);
  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, opts);
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_COOKIE_NAME, { path: '/' });
}

async function refreshAuthToken() {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post('/users/jwt/refresh', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = response.data;
    saveTokens(access_token, refresh_token);

    return access_token;
  } catch (error) {
    clearTokens();
    throw error;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAuthToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
