import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        ns: [],
        defaultNS: "common",
        partialBundledLanguages: true,
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        interpolation: {
            escapeValue: false,
        },
        // debug: import.meta.env.DEV,
        debug: false,
        detection: {
            // 关闭浏览器语言检测
            order: [],
        },
        react: { useSuspense: false },
    });

export default i18n;