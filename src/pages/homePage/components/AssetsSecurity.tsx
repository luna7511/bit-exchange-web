
// import { Fragment } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const securityCards = [
    {
        titleKey: "home.security.iso.title",
        fallbackTitle: "ISO 27001 Information Security Certification",
        descKey: "home.security.iso.desc",
        fallbackDesc: "Protect your data security",
        icon: (
            <svg viewBox="0 0 70 70" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="security-clip-1">
                        <rect width="70" height="70" x="0" y="0" />
                    </clipPath>
                    <linearGradient
                        id="security-gradient-1"
                        spreadMethod="pad"
                        gradientUnits="userSpaceOnUse"
                        x1="25.3477"
                        y1="0"
                        x2="5.9393"
                        y2="25.3421"
                    >
                        <stop offset="0%" stopColor="rgb(53,108,252)" />
                        <stop offset="100%" stopColor="rgb(199,214,255)" />
                    </linearGradient>
                </defs>
                <g clipPath="url(#security-clip-1)">
                    <g transform="translate(9.17 5.77)">
                        <path
                            fill="url(#security-gradient-1)"
                            d="M45.17,4.94C39.76,2.55,32.56,0,25.35,0,19.12,0,10.98,2.86,5.59,5.08A10.01,10.01,0,0,0,.01,13.96C.56,24.08,2.37,35.06,4.94,42.35c1.97,5.59,9.88,11.82,15.25,15.54a10.1,10.1,0,0,0,10.25-.1c5.37-3.87,13.34-10.34,15.32-15.95C48.23,34.83,50.04,23.38,50.64,13.95A10,10,0,0,0,45.17,4.94Z"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    {
        titleKey: "home.security.aml.title",
        fallbackTitle: "Completed Taiwan's Anti-Money Laundering Declaration",
        descKey: "home.security.aml.desc",
        fallbackDesc: "Committed to Building a Compliant Exchange.",
        icon: (
            <svg viewBox="0 0 70 70" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="security-clip-2">
                        <rect width="70" height="70" x="0" y="0" />
                    </clipPath>
                    <linearGradient
                        id="security-gradient-2"
                        spreadMethod="pad"
                        gradientUnits="userSpaceOnUse"
                        x1="33.6038"
                        y1="-6.3474"
                        x2="3.241"
                        y2="37.4963"
                    >
                        <stop offset="0%" stopColor="rgb(53,108,252)" />
                        <stop offset="100%" stopColor="rgb(199,214,255)" />
                    </linearGradient>
                </defs>
                <g clipPath="url(#security-clip-2)">
                    <g transform="translate(12 11.75)">
                        <path
                            fill="url(#security-gradient-2)"
                            d="M0,8.4A8.4,8.4,0,0,1,8.4,0H36.06A8.4,8.4,0,0,1,44.47,8.4V41.01a8.4,8.4,0,0,1-8.41,8.4H8.4A8.4,8.4,0,0,1,0,41.01Z"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
    {
        titleKey: "home.security.insurance.title",
        fallbackTitle: "TWD Bank Trust & Crypto Insurance",
        descKey: "home.security.insurance.desc",
        fallbackDesc: "The double protection mechanism is the most secure",
        icon: (
            <svg viewBox="0 0 70 70" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="security-clip-3">
                        <rect width="70" height="70" x="0" y="0" />
                    </clipPath>
                    <linearGradient
                        id="security-gradient-3"
                        spreadMethod="pad"
                        gradientUnits="userSpaceOnUse"
                        x1="14.6736"
                        y1="44.3521"
                        x2="18.181"
                        y2="10.5843"
                    >
                        <stop offset="0%" stopColor="rgb(53,108,252)" />
                        <stop offset="100%" stopColor="rgb(199,214,255)" />
                    </linearGradient>
                </defs>
                <g clipPath="url(#security-clip-3)">
                    <g transform="translate(9 8)">
                        <path
                            fill="url(#security-gradient-3)"
                            d="M25,0A25,25,0,1,1,0,25,25,25,0,0,1,25,0Z"
                        />
                    </g>
                </g>
            </svg>
        ),
    },
];

export const AssetsSecurity = () => {
    const { t } = useTranslation();
    return (
        <AssetsWrapper>
            <div className="assets-title">{t("home.security.title", "SECURITY")}</div>
            <p className="assets-desc">
                {t("home.security.subtitle", "We spare no effort in protecting your assets")}
            </p>
            <div className="assets-content">
                {securityCards.map((card) => (
                    <div className="assets-item" key={card.titleKey}>
                        <div className="assets-item-img">{card.icon}</div>
                        <div className="assets-item-title">
                            {t(card.titleKey, card.fallbackTitle)}
                        </div>
                        <div className="assets-item-desc">{t(card.descKey, card.fallbackDesc)}</div>
                        <button className="assets-item-btn" type="button">
                            {t("common.more", "More")}
                        </button>
                    </div>
                ))}
            </div>
        </AssetsWrapper>
    );
};

const AssetsWrapper = styled.section`
    width: 100%;
    padding: 60px 34px;
    background: #fff;
    .assets-title {
        text-align: center;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 1.5;
        color: rgb(172, 145, 116);
        font-weight: 500;
    }
    .assets-desc {
        margin-bottom: 48px;
        font-size: 32px;
        color: rgb(16, 20, 31);
        font-weight: 500;
        text-align: center;
    }
    .assets-content {
        display: flex;
        justify-content: space-around;
        gap: 24px;
        flex-wrap: wrap;
    }
    .assets-item {
        padding: 20px 16px 36px;
        max-width: 370px;
        cursor: pointer;
        border-radius: 16px;
        transition: background 0.3s ease;
        &:hover {
            background: rgb(247, 249, 253);
        }
        .assets-item-img {
            width: 70px;
            height: 70px;
            margin: auto;
        }
        .assets-item-title {
            margin: 13px 0 12px;
            font-size: 20px;
            text-align: center;
            font-weight: 700;
            color: #10141f;
        }
        .assets-item-desc {
            color: rgb(75, 88, 111);
            font-size: 16px;
            font-weight: 400;
            line-height: 1.25;
            text-align: center;
            white-space: pre-wrap;
        }
        .assets-item-btn {
            margin-top: 40px;
            text-align: center;
            color: #315fee;
            background: transparent;
            border: none;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
        }
    }
`;

