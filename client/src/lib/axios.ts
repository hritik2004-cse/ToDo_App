import api from "@/config/axios.config";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const REFRESH_URL = "/auth/refresh";

const IGNORED_REFRESH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/verify-email",
  "/auth/resend-verify-email",
  "/auth/forget-password",
  "/auth/resend-forget-password",
  "/auth/reset-password",
];

let onAuthFailure: (() => void) | null = null;
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/** Flush all queued requests after a refresh attempt */
const flushQueue = (error: unknown = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  refreshQueue = [];
};

export const setAuthFailureHandler = (handler: () => void): void => {
  onAuthFailure = handler;
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const isIgnoredRoute = IGNORED_REFRESH_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isIgnoredRoute
    ) {
      originalRequest._retry = true;

      // If a refresh is already in-flight, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await api.post(REFRESH_URL, null);
        flushQueue();          // unblock all queued requests
        return api(originalRequest);
      } catch (refreshError) {
        flushQueue(refreshError); // reject all queued requests
        if (onAuthFailure) {
          onAuthFailure();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
