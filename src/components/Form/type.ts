// 单个字段校验规则

export type ValidatorProps<T = any> = {
    required?: boolean;                        // 是否必填
    message?: string;                          // 错误提示
    pattern?: RegExp;                          // 正则校验
    validator?: (value: string) => string | null | undefined; // 自定义校验函数
};

// Form 的规则集合，T 的每个 key 对应一个字段的规则数组
export type FormRules<T extends Record<string, any>> = Partial<
    Record<keyof T, ValidatorProps[]>
>;

// Form 的错误信息集合，T 的每个 key 对应错误提示或 null
export type FormErrors<T extends Record<string, any>> = Partial<
    Record<keyof T, string | null>
>;

// 暴露给外部 Button 或父组件调用的 handle
export interface FormHandle<T extends Record<string, any>> {
    validateField: (name: keyof T, value?: any) => string | null;  // 校验单个字段
    validateForm: () => boolean;                         // 校验整个表单
}

// FormContext 的值类型
export interface FormContextValue<T extends Record<string, any>> {
    errors: FormErrors<T>;
    validateField: (name: keyof T, value: any) => string | null;
    validateForm: () => boolean;
}

// Form 组件 props
export interface FormProps<T extends Record<string, any>> {
    rules?: FormRules<T>;
    children: React.ReactNode;
    formData?: T;
}

// FormItem props
export interface FormItemProps<T extends Record<string, any>> {
    name: keyof T;                                 // 字段名
    label: string;                                 // 显示 label
    value: string;                                 // 当前值（受控）
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 改变回调
}