import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import bannerImg1 from "@/assets/img/home/banner/banner_img_en1.webp";
import bannerImg2 from "@/assets/img/home/banner/banner_img_en2.webp";
import bannerImg3 from "@/assets/img/home/banner/banner_img_en3.webp";
import bannerImg4 from "@/assets/img/home/banner/banner_img_en4.webp";
import bannerImg5 from "@/assets/img/home/banner/banner_img_en5.webp";
import bannerImg6 from "@/assets/img/home/banner/banner_img_en6.webp";
import bannerImg7 from "@/assets/img/home/banner/banner_img_en7.webp";

const ITEM_WIDTH = 282 + 24;

const bannerImages = [
    bannerImg1,
    bannerImg2,
    bannerImg3,
    bannerImg4,
    bannerImg5,
    bannerImg6,
    bannerImg7,
];

export const Banner = () => {
    const { t } = useTranslation('home');
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const [innerRotation, setInnerRotation] = useState(0);
    const [middleRotation, setMiddleRotation] = useState(0);
    const [outerRotation, setOuterRotation] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const displayImages = useMemo(() => {
        if (bannerImages.length <= 2) return bannerImages;
        return [...bannerImages, bannerImages[0], bannerImages[1]];
    }, []);

    const handleScroll = useCallback(() => {
        if (!bannerRef.current) return;

        const rect = bannerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const isVisible = rect.bottom > 0 && rect.top < viewportHeight;
        if (!isVisible) {
            setInnerRotation(0);
            setMiddleRotation(0);
            setOuterRotation(0);
            return;
        }

        const animationStart = viewportHeight - rect.height;
        const animationEnd = rect.height;
        const scrollProgress = Math.max(
            0,
            Math.min(1, (viewportHeight - rect.top - animationStart) / (animationStart + animationEnd))
        );

        const maxRotation = 360;
        setInnerRotation(scrollProgress * maxRotation);
        setMiddleRotation(-scrollProgress * maxRotation * 0.8);
        setOuterRotation(-scrollProgress * maxRotation * 0.6);
    }, []);

    useEffect(() => {
        const onScroll = () => handleScroll();
        handleScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        setTranslateX(-currentIndex * ITEM_WIDTH);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const timer = window.setInterval(nextSlide, 3000);
        return () => window.clearInterval(timer);
    }, [nextSlide]);

    const handleTransitionEnd = () => {
        if (currentIndex >= bannerImages.length) {
            setIsTransitioning(false);
            setCurrentIndex(0);
            setTranslateX(0);
            requestAnimationFrame(() => setIsTransitioning(true));
        } else if (currentIndex < 0) {
            setIsTransitioning(false);
            setCurrentIndex(bannerImages.length - 1);
            setTranslateX(-(bannerImages.length - 1) * ITEM_WIDTH);
            requestAnimationFrame(() => setIsTransitioning(true));
        }
    };

    return (
        <BannerWrapper ref={bannerRef}>
            <div className="bg-box">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1600 1600"
                    width="1600"
                    height="1600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <clipPath id="banner-clip">
                            <rect width="1600" height="1600" x="0" y="0" />
                        </clipPath>
                        <linearGradient
                            id="banner-gradient"
                            spreadMethod="pad"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            y1="0"
                            x2="-240.57"
                            y2="143.508"
                        >
                            <stop offset="20%" stopColor="rgb(165,193,255)" />
                            <stop offset="60%" stopColor="rgb(116,160,246)" />
                            <stop offset="100%" stopColor="rgb(67,126,237)" />
                        </linearGradient>
                    </defs>
                    <g clipPath="url(#banner-clip)">
                        <g className="outer-ring" transform={`translate(800, 800) rotate(${outerRotation})`}>
                            <g transform="matrix(-0.5,0.866025,-0.866025,-0.5,0,0)">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    stroke="rgb(239,245,255)"
                                    strokeWidth="90"
                                    d="M488.668,-229.926C521.589,-160.151,540,-82.208,540,0C540,298.026,298.026,540,0,540C-298.026,540,-540,298.026,-540,0C-540,-298.026,-298.026,-540,0,-540"
                                />
                            </g>
                            <g transform="matrix(1,0,0,1,0,0)">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    stroke="rgb(141,181,255)"
                                    strokeWidth="90"
                                    d="M-513.673,166.889C-530.762,114.324,-540,58.232,-540,0C-540,-298.026,-298.026,-540,0,-540"
                                />
                            </g>
                        </g>

                        <g className="middle-ring" transform={`translate(800, 800) rotate(${middleRotation})`}>
                            <g>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    stroke="rgb(0,85,245)"
                                    strokeWidth="90"
                                    d="M321.706,269.895C244.635,361.642,129.077,420,0,420C-231.798,420,-420,231.798,-420,0C-420,-2.115,-419.984,-4.227,-419.953,-6.335"
                                />
                            </g>
                            <g>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    stroke="rgb(0,85,245)"
                                    strokeWidth="90"
                                    d="M-135.312,-397.69C-92.846,-412.153,-47.332,-420,0,-420C231.798,-420,420,-231.798,420,0C420,24.895,417.829,49.288,413.666,72.998"
                                />
                            </g>
                        </g>

                        <g className="inner-ring" transform={`translate(800, 800) rotate(${innerRotation})`}>
                            <g>
                                <path
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    stroke="rgb(239,245,255)"
                                    strokeWidth="90"
                                    d="M0,-300C165.57,-300,300,-165.57,300,0C300,165.57,165.57,300,0,300C-165.57,300,-300,165.57,-300,0C-300,-165.57,-165.57,-300,0,-300"
                                />
                            </g>
                            <g>
                                <path
                                    stroke="url(#banner-gradient)"
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                    fillOpacity="0"
                                    strokeWidth="90"
                                    d="M0,300C-165.57,300,-300,165.57,-300,0C-300,-165.57,-165.57,-300,0,-300"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            <div className="banner-title">
                <h1 className="title">
                    {t("banner.title1")}
                    <br />
                    {t("banner.title2")}
                </h1>
                <h2 className="desc">{t("banner.subtitle")}</h2>
                <button className="banner-btn" type="button">
                    {t("banner.cta")}
                </button>
            </div>

            <div className="banner-swiper">
                <div
                    className={clsx("swiper-container", { "no-transition": !isTransitioning })}
                    style={{ transform: `translateX(${translateX}px)` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {displayImages.map((src, index) => (
                        <div className="swiper-item" key={`${src}-${index}`}>
                            <img src={src} alt={`promo-${index}`} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </BannerWrapper>
    );
};

const BannerWrapper = styled.section`
    position: relative;
    width: 100%;
    height: 775px;
    overflow: hidden;
    svg {
        display: block;
    }
    .bg-box {
        position: absolute;
        right: -550px;
        top: -180px;
    }
    .banner-title {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        z-index: 1;
        color: #10141f;
        h1 {
            margin-top: 144px;
            margin-bottom: 32px;
            font-size: 48px;
            line-height: 150%;
            font-weight: 700;
        }
        h2 {
            font-size: 32px;
            margin-bottom: 45px;
        }
        .banner-btn {
            padding: 16px 130px;
            background: rgb(49, 95, 238);
            text-align: center;
            border-radius: 58px;
            color: #fff;
            width: 370px;
            font-size: 18px;
            font-weight: 500;
            border: none;
            cursor: pointer;
        }
    }
    .banner-swiper {
        width: 1200px;
        margin: 120px auto 20px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        .swiper-container {
            display: flex;
            transition: transform 0.5s ease-in-out;
            &.no-transition {
                transition: none;
            }
        }
        .swiper-item {
            flex-shrink: 0;
            margin-right: 24px;
            img {
                width: 282px;
                height: 160px;
                border-radius: 10px;
                display: block;
                object-fit: cover;
            }
        }
    }
`;

