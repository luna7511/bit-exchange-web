import { useRef } from "react";
import type { FormHandle } from "./type.ts";

export const useForm = <T extends Record<string, any> = any>() => {
    const ref = useRef<FormHandle<T>>(null);
    return ref;
};

export * from "./Form";
export * from "./FormItem";