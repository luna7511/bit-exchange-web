import { useEffect } from "react";
import { useGlobalStore } from "../store/useGlobalStore";

/**
 * 判断 PC / Mobile
 */
export function useResponsive() {
    const setIsMobile = useGlobalStore((s) => s.setIsMobile);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
        };

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, []);

    return useGlobalStore((s) => s.isMobile);
}