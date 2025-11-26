import {
    useState,
    forwardRef,
    useImperativeHandle, type Ref,
} from "react";
import { FormContext } from "../content.ts";
import type { FormErrors, FormProps, FormHandle } from "../type.ts";

export const Form = forwardRef(<T extends Record<string, any>>(
    { rules = {}, children, formData = {} }: FormProps<T>,
    ref: Ref<FormHandle<T>>
) => {
    const [errors, setErrors] = useState<FormErrors<T>>({});

    const validateField = (name: keyof T, value?: string): string | null => {
        const fieldRules = rules[name];
        if (!fieldRules) return null;

        const fieldValue = value || formData?.[name];
        for (const rule of fieldRules) {
            if (rule.required && !value) {
                const msg = rule.message || "required";
                setErrors(prev => ({ ...prev, [name]: msg }));
                return msg;
            }
            if (rule.pattern && !rule.pattern.test(fieldValue)) {
                const msg = rule.message || "pattern fail";
                setErrors(prev => ({ ...prev, [name]: msg }));
                return msg;
            }
            if (rule.validator) {
                const msg = rule.validator(value);
                if (msg) {
                    setErrors(prev => ({ ...prev, [name]: msg }));
                    return msg;
                }
            }
        }

        setErrors(prev => ({ ...prev, [name]: null }));
        return null;
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors<T> = {};

        (Object.keys(rules) as (keyof T)[]).forEach(key => {
            const err = validateField(key, formData?.[key]);
            if (err) {
                isValid = false;
                newErrors[key] = err;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // 暴露给外部 ref
    useImperativeHandle(ref, () => ({
        validateField,
        validateForm,
    }));

    return (
        <FormContext.Provider value={{ errors, validateField, validateForm }}>
            <form>{children}</form>
        </FormContext.Provider>
    );
});