import { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

export const GroupStats = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [rotation, setRotation] = useState(0);

    const calculateProgress = useCallback(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        const startPoint = windowHeight;
        const endPoint = -elementHeight;
        const totalRange = startPoint - endPoint;
        const currentPosition = startPoint - rect.top;
        const progress = Math.max(0, Math.min(1, currentPosition / totalRange));
        setRotation(progress * 360);
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

    return (
        <StatsWrapper ref={sectionRef}>
            <div className="color-bg" />
            <div className="data-content">
                <div className="data-bg" style={{ transform: `translateX(100%) rotate(${rotation}deg)` }}>
                    <svg viewBox="0 0 288 405" width="288" height="405" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="group-stats-clip">
                                <rect width="288" height="405" x="0" y="0" />
                            </clipPath>
                        </defs>
                        <g clipPath="url(#group-stats-clip)">
                            <g transform="translate(144 202.5)">
                                <path
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    fill="none"
                                    stroke="rgb(174,198,247)"
                                    strokeWidth="180"
                                    d="M-178.594,-114.5C-76.628,-98.629,-18.451,-41.19,13.854,24.759"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="data-title">{t("home.group.title", "About BitoGroup")}</div>
                <div className="data-text">
                    {t("home.group.desc1", "Survive through various bull and bear markets,")}
                    <br />
                    {t("home.group.desc2", "BitoPro is the reliable support you can trust.")}
                </div>
                <div className="data-bottom">
                    <div className="data-item">
                        <div className="data-num">2014</div>
                        <div className="data-line" />
                        <div className="data-desc">{t("home.group.stat1", "BitoGroup established")}</div>
                    </div>
                    <div className="data-item">
                        <div className="data-num">800,000＋</div>
                        <div className="data-line" />
                        <div className="data-desc">{t("home.group.stat2", "Total number of members")}</div>
                    </div>
                </div>
            </div>
        </StatsWrapper>
    );
};

const StatsWrapper = styled.section`
    width: 100%;
    height: 400px;
    position: relative;
    background: transparent;
    .color-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 50%;
        height: 100%;
        background-color: rgb(28, 58, 116);
    }
    .data-content {
        background-color: rgb(28, 58, 116);
        width: 880px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        color: #fff;
        padding-top: 64px;
        border-radius: 0 0 70px;
        overflow: hidden;
        .data-bg {
            position: absolute;
            top: 0;
            height: 100%;
            right: 2px;
            transform-origin: center center;
            will-change: transform;
        }
    }
    .data-title {
        font-size: 20px;
        color: rgb(197, 207, 226);
        font-weight: 500;
    }
    .data-text {
        margin-bottom: 36px;
        font-size: 32px;
    }
    .data-bottom {
        display: flex;
        gap: 200px;
        .data-item {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .data-num {
            margin-bottom: 10px;
            font-size: 56px;
            font-weight: 700;
            color: rgb(204, 182, 156);
        }
        .data-line {
            width: 25px;
            height: 3px;
            background: linear-gradient(119deg, rgb(172, 145, 116) 0%, rgb(221, 190, 149) 100%);
            margin: 10px auto 20px;
        }
        .data-desc {
            font-size: 20px;
        }
    }
`;

