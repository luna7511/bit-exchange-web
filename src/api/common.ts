import request from "@/lib/request";
import type {PlatformConfig} from "@/api/type/common.ts";

// 用户名注册
export const userAccountRegister = (parmas: {
    confirmPassword: string;
    password: string;
    payPassword: string;
    referrerInviteCode: string;
    username: string;
}) => request.post('/api/user/register/username', parmas)
// 用户名登录
export const userAccountLogin = (parmas: {
    username: string,
    password: string
}) => request.post<{token: string}>('/api/user/login/username', parmas)


// 用户邮箱注册
export const userEmailRegister = (parmas: {
    confirmPassword: string;
    password: string;
    payPassword: string;
    referrerInviteCode: string;
    email: string;
    emailCode: string;
}) => request.post('/api/user/register/email', parmas)
// 用户邮箱登录
export const userEmailLogin = (parmas: {
    email: string,
    password: string
}) => request.post<{token: string}>('/api/user/login/email/password', parmas)

/**
 * 发送验证码
 * scene::REGISTER,LOGIN,RESET_PASSWORD,BIND_EMAIL
  */
export const sendCaptchaCode = (scene: string, email: string) => {
    return request.post(`/api/user/email-code`, {email, scene})
}

/**
 * 获取前台文本配置
 * @param contentType	内容类型 1:诈骗风险警告 2:交易风险警告 3:隐私协议 4:许可证 5:关于我们
 * @param langCode 语言代码 如: ZH_CN(简体中文), EN(英文), ZH_TW(繁体中文)
 * @returns 获取前台文本配置
 */
export const getTerms = (contentType: string, langCode: string) => {
    return request.get<{data: string}>("/api/content-config/default", {
        contentType,
        langCode
    });
}

export const getPlatformConfig = () => {
    return request.get<PlatformConfig>(`/api/platform/config`, {})
}