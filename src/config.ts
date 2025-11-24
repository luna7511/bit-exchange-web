// src/config.ts
export const IS_PROD = import.meta.env.MODE === 'production';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const WS_URL = import.meta.env.VITE_WS_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;
