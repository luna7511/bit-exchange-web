import {type ChangeEvent, cloneElement, isValidElement, type ReactNode, useContext} from "react";
import { FormControl } from "@/components/FormControl";
import { InputLabel } from "@/components/InputLabel";
import { FormContext } from "../content.ts";

interface FormItemProps {
    label?: string;
    name?: string;
    children: ReactNode; // 外部传入组件，例如 <Input />
    className?: string;
}

export default function FormItem({ label, children, name, className }: FormItemProps) {
    const ctx = useContext(FormContext) as any; // 泛型可以自行约束
    const errorMsg = name ? ctx?.errors?.[name] ?? null : null;

    // 如果 children 是合法 React 元素，则注入 error / helperText / onChange
    const childWithProps = isValidElement(children)
        ? cloneElement(children, {
            error: !!errorMsg,
            helperText: errorMsg,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                // 保留原来的 onChange
                children.props.onChange?.(e);
                // 自动触发表单校验
                if (ctx && name) ctx.validateField(name, e.target.value);
            },
        })
        : children;

    return (
        <FormControl className={className} fullWidth>
            {label && <InputLabel shrink>{label}</InputLabel>}
            {childWithProps}
        </FormControl>
    );
}