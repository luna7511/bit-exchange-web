import axios from "axios";

import { API_BASE_URL, IS_PROD } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner"

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 25000,
});

// 请求拦截
service.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        console.log("http返回", res.config.url, res.data);

        const data = res.data;
        const errorData = data.msg;

        // 错误处理
        if (data.code === "003") {
            console.error("token过期");
            useUserStore.getState().userLogout();
        }

        if (errorData) {
            toast.error(errorData);
            return Promise.reject(errorData);
        }

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

export default service;
