import axios, {type AxiosRequestConfig} from "axios";

import { API_BASE_URL, IS_PROD } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import {toast} from "sonner";
import {useGlobalStore} from "@/store/useGlobalStore.ts";

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 25000,
});

// 请求拦截
service.interceptors.request.use(
    (config) => {
        const lang = useGlobalStore.getState().lang;
        config.headers["Accept-Language"] = lang;

        const token = useUserStore.getState().token;
        if (token) {
            config.headers.Authorization = token;
        }
        if (!IS_PROD) {
            console.log("http请求", config.url, config.params, config.data);
        }
        return config;
    },
    (err) => Promise.reject(err),
);

// 响应拦截
service.interceptors.response.use(
    (res) => {
        if (!IS_PROD) {
            console.log("http返回", res.config.url, res.data);
        }

        const data = res.data;
        if (data.code !== 200) {
            // 错误处理
            if (data.code === 401) {
                console.error("token过期");
                useUserStore.getState().userLogout();
                // todo 如果不在白名单列表，就回到首页
                window.location.href = "/";
            } else if (data.msg) {
                toast.error(data.msg)
            }
            return Promise.reject(data);
        }

        if (data.token) {
            return {
                token: data.token,
            }
        }
        // todo token返回对齐
        return data?.data;
    },
    (err: Error) => {
        console.log("请求失败", err, err.message);
        if (err.message?.includes("timeout")) {
            console.error("timeout error", err);
        }
        if (err.message?.includes("Network Error")) {
            console.error("network error", err);
        }
        return Promise.reject(err);
    },
);

const request = {
    post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return service.post(url, data, config);
    },
    get: async <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
        return service.get(url, { ...config, params });
    },
    put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return service.put(url, data, config);
    },
    delete: async <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
        return service.delete(url, { ...config, params });
    },
};

export default request;
