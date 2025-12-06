import { clsx, type ClassValue } from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 节流
 * @param fn
 * @param wait
 */
export function throttle<T extends (...args: any[]) => any>(
    fn: T,
    wait = 300
): (...args: Parameters<T>) => void {
    let lastTime = 0;
    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn(...args);
        }
    };
}

/**
 * 防
 * @param fn
 * @param delay
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay = 300
): (...args: Parameters<T>) => void {
    let timer: any = null;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}