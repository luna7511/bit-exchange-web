import {getTerms, sendCaptchaCode, userAccountLogin, userAccountRegister, userEmailRegister, userEmailLogin } from "@/api/common.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useUserStore} from "@/store/useUserStore.ts";

// 用户名注册
export const useUserAccountRegister = () => {
    return useMutation({
        mutationFn: (params: {
            confirmPassword: string;
            password: string;
            payPassword: string;
            referrerInviteCode: string;
            username: string;
        }) => userAccountRegister(params)
    });
};

// 用户名登录
export const useUserAccountLogin = () => {
    const setToken = useUserStore(state => state.setToken);
    return useMutation({
        mutationFn: (params: {
            username: string;
            password: string;
        }) => {
            return userAccountLogin(params)
        },
        onSuccess: ({ token }) => {
            setToken(token);
        }
    });
};

// 用户邮箱注册
export const useUserEmailRegister = () => {
    return useMutation({
        mutationFn: (params: {
            confirmPassword: string;
            password: string;
            payPassword: string;
            referrerInviteCode: string;
            email: string;
            emailCode: string;
        }) => userEmailRegister(params)
    });
};

// 用户邮箱登录
export const useUserEmailLogin = () => {
    const setToken = useUserStore(state => state.setToken);
    return useMutation({
        mutationFn: (params: {
            email: string;
            password: string;
        }) => {
            return userEmailLogin(params)
        },
        onSuccess: ({ token }) => {
            setToken(token);
        }
    });
};

export function useSendCaptchaCode() {
    return useMutation({
        mutationFn: ({codeType, email}: {codeType: string, email: string}) => sendCaptchaCode(codeType, email),
    })
}

export const useGetTerms = (key: string) => {
    return useQuery({
        queryKey: ["getTerms", key],
        queryFn: () => getTerms(key),
        enabled: !!key,
    })
}