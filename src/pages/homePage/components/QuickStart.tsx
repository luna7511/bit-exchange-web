import { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const steps = [
    { titleKey: "home.quick.step1.title", fallbackTitle: "Sign up as BitoPro member" },
    {
        titleKey: "home.quick.step2.title",
        fallbackTitle: "Completed KYC",
        descKey: "home.quick.step2.desc",
        fallbackDesc: "Identity verification for account security",
    },
    {
        titleKey: "home.quick.step3.title",
        fallbackTitle: "Deposit",
        descKey: "home.quick.step3.desc",
        fallbackDesc: "By convenience store or bank transfer",
    },
    { titleKey: "home.quick.step4.title", fallbackTitle: "Buy Now" },
];

const circleCenter = { x: 382.97, y: 382.528 };
const circleRadius = Math.sqrt(168.529 ** 2 + 258.116 ** 2);
const dotInitial = { x: 413.433, y: 78.017 };
const initialAngle = Math.atan2(dotInitial.y - circleCenter.y, dotInitial.x - circleCenter.x);

export const QuickStart = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);

    const calculateProgress = useCallback(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        const startPoint = windowHeight;
        const endPoint = -elementHeight;
        const totalRange = startPoint - endPoint;
        const currentPosition = startPoint - rect.top;
        const nextProgress = Math.max(0, Math.min(1, currentPosition / totalRange));
        setProgress(nextProgress);
    }, []);

    useEffect(() => {
        const onScroll = () => calculateProgress();
        calculateProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [calculateProgress]);

    const rotationAngle = progress * 360;
    const currentAngle = initialAngle - (rotationAngle * Math.PI) / 180;
    const dotPosition = {
        x: circleCenter.x + circleRadius * Math.cos(currentAngle),
        y: circleCenter.y + circleRadius * Math.sin(currentAngle),
    };

    return (
        <QuickWrapper ref={sectionRef}>
            <div className="step-top">
                <div className="one" />
                <div className="three" />
            </div>
            <div className="step-main">
                <div className="step-content">
                    <div className="step-content-bg">
                        <svg viewBox="0 0 285 766" width="285" height="766" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="quick-start-clip">
                                    <rect width="285" height="766" x="0" y="0" />
                                </clipPath>
                            </defs>
                            <g clipPath="url(#quick-start-clip)">
                                <g transform="matrix(0.346,0.938,-0.938,0.346,129.764,-108.89)">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        stroke="rgb(73,117,242)"
                                        strokeWidth="148.477"
                                        d="M-168.529,-258.116C-25.976,-351.192,165.04,-311.082,258.116,-168.529C351.192,-25.976,311.082,165.04,168.529,258.116C25.976,351.192,-165.039,311.081,-258.115,168.528C-351.191,25.975,-311.082,-165.04,-168.529,-258.116Z"
                                    />
                                </g>
                                <g transform={`matrix(1,0,0,1,${dotPosition.x},${dotPosition.y})`}>
                                    <circle r="36" fill="rgb(50,96,239)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="step-title">
                        {t("home.quick.title", "Get BTC only takes the time of a cup of coffee")}
                    </div>
                    <div className="step-num-box">
                        {steps.map((step, index) => (
                            <div className="step-num" key={step.titleKey}>
                                <div className="num">{index + 1}</div>
                                <div className="num-box">
                                    <div className="num-title">{t(step.titleKey, step.fallbackTitle)}</div>
                                    {step.descKey && (
                                        <div className="num-desc">{t(step.descKey, step.fallbackDesc ?? "")}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="step-btn">
                        {t("home.quick.cta", "Get Started")}
                    </button>
                    <div className="step-img">
                        <svg viewBox="0 0 228 500" width="228" height="500" xmlns="http://www.w3.org/2000/svg">
                            <rect width="228" height="500" fill="#f4f4f4" rx="40" />
                        </svg>
                    </div>
                    <img className="step-img-bg" src="/assets/download/step.svg" alt="step" />
                </div>
            </div>
        </QuickWrapper>
    );
};

const QuickWrapper = styled.section`
    width: 100%;
    position: relative;
    .step-top {
        height: 64px;
        background-color: rgb(230, 214, 192);
        width: 100%;
        position: relative;
        .one {
            background-color: rgb(255, 247, 236);
            width: 210px;
            height: 100%;
        }
        .three {
            background-color: rgb(255, 247, 236);
            width: 880px;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
        }
    }
    .step-main {
        width: 100%;
        background: linear-gradient(to right, rgb(247, 249, 253) 50%, rgb(28, 58, 116) 50%);
        height: 700px;
    }
    .step-content {
        width: 880px;
        margin: 0 auto;
        height: 100%;
        position: relative;
        background: #fff;
        padding: 80px 0 80px 60px;
        overflow: hidden;
    }
    .step-content-bg {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        transform: translateX(100%);
    }
    .step-title {
        margin-bottom: 48px;
        font-size: 32px;
        font-weight: 700;
    }
    .step-num-box {
        position: relative;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 27px;
            width: 1px;
            height: 100%;
            background: linear-gradient(
                transparent 0%,
                transparent 50%,
                rgb(197, 207, 226) 50%,
                rgb(197, 207, 226) 100%
            );
        }
    }
    .step-num {
        margin-bottom: 44px;
        display: flex;
        position: relative;
        z-index: 1;
        .num {
            line-height: 52px;
            font-size: 24px;
            height: 56px;
            width: 56px;
            text-align: center;
            border-radius: 50%;
            background-color: #fff;
            border: 1px solid rgb(197, 207, 226);
            color: rgb(16, 20, 31);
            margin-right: 25px;
        }
        .num-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .num-title {
            font-size: 24px;
            font-weight: 700;
        }
        .num-desc {
            font-size: 17px;
            font-weight: 400;
            line-height: 1.25;
            margin-top: 10px;
        }
    }
    .step-btn {
        width: 370px;
        height: 56px;
        background-color: rgb(50, 96, 239);
        color: #fff;
        border-radius: 28px;
        border: none;
        text-align: center;
        line-height: 56px;
        font-size: 24px;
        font-weight: 600;
        cursor: pointer;
    }
    .step-img-bg {
        position: absolute;
        bottom: 0;
        right: 0;
        max-width: 100%;
    }
    .step-img {
        position: absolute;
        bottom: 156px;
        right: 60px;
    }
`;

