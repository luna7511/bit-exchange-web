// Hook：带泛型，自动推导 form 类型
import {createContext} from "react";
import type {FormContextValue} from "./type.ts";

/**
 * 工厂函数：为每个 Form 创建独立的 Context
 */
export const createFormContext = <T extends Record<string, any>>() =>
    createContext<FormContextValue<T> | null>(null);

// 每个 Form 独立 Context
export const FormContext = createFormContext<any>();