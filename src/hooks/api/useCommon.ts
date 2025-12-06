import {
    getTerms, sendCaptchaCode, userAccountLogin, userAccountRegister, userEmailRegister, userEmailLogin,
    getPlatformConfig
} from "@/api/common.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useUserStore} from "@/store/useUserStore.ts";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {usePlatformStore} from "@/store/usePlatformStore.ts";


export const useGetPlatformConfig = () => {
    const setPlatformConfig = usePlatformStore(state => state.setPlatformConfig);
    return useQuery({
        queryKey: ["getPlatformConfig"],
        queryFn: async() => {
            const data = await getPlatformConfig();
            setPlatformConfig(data?? {});
        }
    })
}
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
    const lang = useGlobalStore(state => state.lang);
    return useQuery({
        queryKey: ["getTerms", key, lang],
        queryFn: () => getTerms(key, lang.toUpperCase()),
        enabled: !!key,
    })
}