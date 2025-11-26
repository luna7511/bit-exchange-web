import { useEffect, useState } from "react";

export function useCaptchaCountdown(seconds = 60) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count <= 0) return;
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [count]);

    return {
        count,
        start: () => setCount(seconds),
        isCounting: count > 0,
    };
}