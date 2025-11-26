import {Trans, useTranslation} from "react-i18next";
import Typography from '@mui/material/Typography';
import {Input} from "@/components/Input";
import {useCallback, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useUserAccountLogin, useUserEmailLogin } from "@/hooks/api/useCommon.ts";
import AuthTabs from "@/components/AuthTabs";
import {Form, useForm} from "@/components/Form";
import FormItem from "@/components/Form/FormItem";

const Login = () => {
    const {t} = useTranslation("auth");
    const navigate = useNavigate();
    const [registerType, setRegisterType] = useState("account");
    const [showPassword, setShowPassword] = useState(false);

    const [accountForm, setAccountForm]  = useState({
        account: "",
        password: "",
    });

    const [emailForm, setEmailForm] = useState({
        email: "",
        password: "",
    });

    const { mutateAsync: userAccountLogin, isPending: isPendingAccountLogin } = useUserAccountLogin();
    const { mutateAsync: userEmailLogin, isPending: isPendingEmailLogin } = useUserEmailLogin();

    const accountFormRef = useForm();
    const accountFormRules = {
        account: [{required: true, message: t("error.account.empty")}],
        password: [{required: true, message: t("error.password.empty")}],
    }

    const emailFormRef = useForm();
    const emailFormRules = {
        email: [{required: true, message: t("error.email.empty")}],
        password: [{required: true, message: t("error.password.empty")}],
    }
    const handleSubmit = useCallback(async () => {
        if (isPendingAccountLogin || isPendingEmailLogin) return;

        if (registerType === "account") {
            const isValid = accountFormRef.current?.validateForm();
            if (!isValid) return;

            await userAccountLogin({
                username: accountForm.account,
                password: accountForm.password,
            });
        } else {
            const isValid = emailFormRef.current?.validateForm();
            if (!isValid) return;

            await userEmailLogin(emailForm);
        }
        navigate("/", {
            replace: true,
        });
    }, [registerType, accountForm, emailForm]);

    return (
        <div>
            <Typography variant="h5">
                {t("sigIn")}
            </Typography>

            <AuthTabs
                value={registerType}
                onChange={setRegisterType}
                tabs={[
                    { label: t("accountRegister"), value: "account" },
                    { label: t("emailRegister"), value: "email" },
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
                            type={showPassword ? 'text' : 'password'}
                            value={accountForm.password}
                            onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </span>
                                    ),
                                },
                            }}
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
                    <FormItem name="password" label={t("password")}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={emailForm.password}
                            onChange={(e) => setEmailForm({...emailForm, password: e.target.value})}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </span>
                                    ),
                                },
                            }}
                        />
                    </FormItem>
                </Form>
            </div>

            {/* Submit */}
            <Button
                fullWidth size="large"
                className="mt-8! mb-4!"
                disabled={isPendingAccountLogin || isPendingEmailLogin}
                loading={isPendingAccountLogin || isPendingEmailLogin}
                onClick={handleSubmit}
            >
                {t("sigIn")}
            </Button>

            {/* Already have account? */}
            <div className="text-sm mt-4">
                <Trans
                    i18nKey="auth:noAccountAvailableTips"
                    components={{
                        t: <Link to="/users/signUp" className="text-primary px-1" />
                    }}
                />
            </div>

        </div>
    )
}

export default Login;