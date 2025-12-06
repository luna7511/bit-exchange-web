import {Trans, useTranslation} from "react-i18next";
import Typography from '@mui/material/Typography';
import {Input} from "@/components/Input";
import {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import {cn} from "@/lib/utils";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {useSendCaptchaCode, useUserAccountRegister, useUserEmailRegister} from "@/hooks/api/useCommon.ts";
import {useCaptchaCountdown} from "@/hooks/useCaptchaCountdown.ts";
import AuthTabs from "@/components/AuthTabs";
import {Form, useForm} from "@/components/Form";
import FormItem from "@/components/Form/FormItem";
import {toast} from "sonner";

const Register = () => {
    const {t} = useTranslation("auth");
    const navigate = useNavigate()
    const [registerType, setRegisterType] = useState("account");
    const [showPassword, setShowPassword] = useState(false);

    const [accountForm, setAccountForm] = useState({
        account: "",
        password: "",
        confirmPassword: "",
        referrerInviteCode: "",
        payPassword: "",
    });

    const [emailForm, setEmailForm] = useState({
        email: "",
        captchaCode: "",
        password: "",
        payPassword: "",
        confirmPassword: "",
        referrerInviteCode: ""
    });

    const accountFormRef = useForm();
    const accountFormRules = {
        account: [{required: true, message: t("error.account.empty")}],
        password: [{required: true, message: t("error.password.empty")}],
        payPassword: [
            {required: true, message: t("error.payPassword.empty")},
            {pattern: /^\d{6}$/, message: t("error.payPassword.formate")},
        ],
        confirmPassword: [
            {required: true, message: t("error.confirmPassword.empty")},
            {
                validator: (value: string) => {
                    if (value !== accountForm.password) {
                        return t("error.confirmPassword.notEqualsPassword");
                    }
                }
            }
        ],
    }

    const emailFormRef = useForm();
    const emailFormRules = {
        email: [{required: true, message: t("error.email.empty")}],
        captchaCode: [{required: true, message: t("error.captchaCode.empty")}],
        password: [{required: true, message: t("error.password.empty")}],
        payPassword: [
            {required: true, message: t("error.payPassword.empty")},
            {pattern: /^\d{6}$/, message: t("error.payPassword.formate")},
        ],
        confirmPassword: [
            {required: true, message: t("error.confirmPassword.empty")},
            {
                validator: (value: string) => {
                    if (value !== emailForm.password) {
                        return t("error.confirmPassword.notEqualsPassword");
                    }
                }
            }
        ],
    }

    const {mutateAsync: userAccountRegister, isPending: isPendingAccountRegister} = useUserAccountRegister();
    const {mutateAsync: userEmailRegister, isPending: isPendingEmailRegister} = useUserEmailRegister();


    const handleSubmit = async () => {
        if (isPendingAccountRegister || isPendingEmailRegister) {
            return;
        }
        try {
            if (registerType === "account") {
                const isValid = accountFormRef.current?.validateForm();
                if (!isValid) return;

                await userAccountRegister({
                    username: accountForm.account,
                    password: accountForm.password,
                    confirmPassword: accountForm.confirmPassword,
                    referrerInviteCode: accountForm.referrerInviteCode,
                    payPassword: accountForm.payPassword,
                });
            } else {
                const isValid = emailFormRef.current?.validateForm();
                if (!isValid) return;

                await userEmailRegister({
                    email: emailForm.email,
                    emailCode: emailForm.captchaCode,
                    password: emailForm.password,
                    confirmPassword: emailForm.confirmPassword,
                    referrerInviteCode: emailForm.referrerInviteCode,
                    payPassword: emailForm.payPassword,
                });
            }
            toast.success(t("signUp.success"))
            navigate("/users/signIn", {
                replace: true,
            })
        } catch(error) {
            console.error(error)
        }
    }

    const countdown = useCaptchaCountdown(60);
    const {mutateAsync: sendCaptchaCode, isPending: isPendingSendCode} = useSendCaptchaCode();
    const sendCaptcha = async () => {
        if (isPendingSendCode || countdown.isCounting) {
            return;
        }
        try {
            const isValid = emailFormRef.current?.validateField("email");
            if (isValid) return;

            await sendCaptchaCode({
                codeType: "REGISTER",
                email: emailForm.email
            });
            countdown.start();
        } catch (error) {
            console.error("sendCaptcha error", error);
        }
    }

    return (
        <div>
            <Typography variant="h5">
                {t("signUp")}
            </Typography>

            <AuthTabs
                value={registerType}
                onChange={setRegisterType}
                tabs={[
                    {label: t("accountRegister"), value: "account"},
                    {label: t("emailRegister"), value: "email"},
                ]}
            />

            {/* Account Register */}
            <div className={cn("hidden", registerType === "account" && "block")}>
                <Form ref={accountFormRef} rules={accountFormRules} formData={accountForm}>
                    <FormItem name="account" label={t("account")}>
                        <Input
                            size="medium"
                            value={accountForm.account}
                            onChange={(e) => setAccountForm({...accountForm, account: e.target.value})}
                        />
                    </FormItem>

                    <FormItem name="password" label={t("password")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={accountForm.password}
                            onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="confirmPassword" label={t("confirmPassword")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={accountForm.confirmPassword}
                            onChange={(e) => setAccountForm({...accountForm, confirmPassword: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>


                    <FormItem name="payPassword" label={t("payPassword")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={accountForm.payPassword}
                            onChange={(e) => setAccountForm({...accountForm, payPassword: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="referrerInviteCode" label={t("invitationCode")}>
                        <Input
                            value={accountForm.referrerInviteCode}
                            onChange={(e) => setAccountForm({...accountForm, referrerInviteCode: e.target.value})}
                        />
                    </FormItem>
                </Form>
            </div>

            {/* Email Register */}
            <div className={cn("hidden", registerType === "email" && "block")}>
                <Form ref={emailFormRef} rules={emailFormRules} formData={emailForm}>
                    <FormItem name="email" label={t("email")}>
                        <Input
                            size="medium"
                            value={emailForm.email}
                            onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                        />
                    </FormItem>

                    <FormItem name="captchaCode" label={t("captchaCode")}>
                        <Input
                            value={emailForm.captchaCode}
                            onChange={(e) => setEmailForm({...emailForm, captchaCode: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            size="small"
                                            disabled={countdown.count > 0 || isPendingSendCode}
                                            onClick={() => sendCaptcha()}
                                            loading={isPendingSendCode}
                                            sx={{paddingInline: 0, minWidth: "100px", justifyContent: "flex-end"}}
                                        >
                                            {countdown.count > 0 ? t("sent", {time: countdown.count}) : t("sendCaptchaCode")}
                                        </Button>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="password" label={t("password")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={emailForm.password}
                            onChange={(e) => setEmailForm({...emailForm, password: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="confirmPassword" label={t("confirmPassword")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={emailForm.confirmPassword}
                            onChange={(e) => setEmailForm({...emailForm, confirmPassword: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="payPassword" label={t("payPassword")}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={accountForm.payPassword}
                            onChange={(e) => setAccountForm({...accountForm, payPassword: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>

                    <FormItem name="referrerInviteCode" label={t("invitationCode")}>
                        <Input
                            value={emailForm.referrerInviteCode}
                            onChange={(e) => setEmailForm({...emailForm, referrerInviteCode: e.target.value})}
                        />
                    </FormItem>
                </Form>

            </div>

            {/* Terms */}
            <div className="text-left">
                <Checkbox defaultChecked size="small"/>
                <span className="text-sm">
                    <Trans
                        i18nKey="auth:agreeTerms"
                        components={{
                            t: <Link to="/privacyPolicy" target="_blank" className="text-primary px-1"/>
                        }}
                    />
                </span>
            </div>

            {/* Submit */}
            <Button
                fullWidth size="large"
                className="mt-8! mb-4!"
                disabled={isPendingAccountRegister || isPendingEmailRegister}
                onClick={handleSubmit}
                loading={isPendingAccountRegister || isPendingEmailRegister}
            >
                {t("signUp")}
            </Button>

            {/* Already have account? */}
            <div className="text-sm mt-4">
                <Trans
                    i18nKey="auth:existingAccountTips"
                    components={{
                        t: <Link to="/users/signIn" className="text-primary px-1"/>
                    }}
                />
            </div>

        </div>
    )
}

export default Register;