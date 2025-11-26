import request from "@/lib/request";

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
 * TERMS_CLAUSE --服务条款
 * PERIOD_EXPLAIN --秒合约说明
 * COIN_EXPLAIN --币币交易说明
 * AGENCY_ACTIVITY --代理活动
 * U_STANDARD_EXPLAIN --U本位合约说明
 * REGISTRY_PRIVACY --注册隐私政策
 * REGISTRY_CLAUSE --注册使用条款
 * LOANS_RULE --贷款规则
 * FREEZE_PROMPT -- 冻结文本
 * @returns 获取前台文本配置
 */
export const getTerms = (query: string) => {
    return request.post(`/api/option/rules/list?key=${query}`, {});
}