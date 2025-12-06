import { useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type GoalItem = {
    key: string;
    titleKey: string;
    fallbackTitle: string;
    descKey: string;
    fallbackDesc: string;
    icon: string;
    bullets: { key: string; fallback: string }[];
};

type GoalTab = {
    key: string;
    labelKey: string;
    fallbackLabel: string;
    items: GoalItem[];
};

const goalTabs: GoalTab[] = [
    {
        key: "conservative",
        labelKey: "home.goals.conservative",
        fallbackLabel: "Conservative",
        items: [
            {
                key: "bitodebt",
                titleKey: "home.goals.bitodebt.title",
                fallbackTitle: "BitoDebt",
                descKey: "home.goals.bitodebt.desc",
                fallbackDesc: "Buy Debt Earn Stable Interest",
                icon: "/assets/download/pig.svg",
                bullets: [
                    { key: "home.goals.bitodebt.b1", fallback: "Low-risk" },
                    { key: "home.goals.bitodebt.b2", fallback: "The safest choice" },
                    { key: "home.goals.bitodebt.b3", fallback: "8.5% APR ↑" },
                ],
            },
            {
                key: "quickorder",
                titleKey: "home.goals.quick.title",
                fallbackTitle: "Quick Order",
                descKey: "home.goals.quick.desc",
                fallbackDesc: "Buy and sell within 3 seconds",
                icon: "/assets/download/quickBuySell.svg",
                bullets: [
                    { key: "home.goals.quick.b1", fallback: "Minimum threshold TWD 100" },
                    { key: "home.goals.quick.b2", fallback: "Easy, no slippage" },
                ],
            },
            {
                key: "pointswap",
                titleKey: "home.goals.point.title",
                fallbackTitle: "Points/Crypto Swap",
                descKey: "home.goals.point.desc",
                fallbackDesc: "Easy entry at no extra cost",
                icon: "/assets/download/pointCharge.svg",
                bullets: [
                    { key: "home.goals.point.b1", fallback: "Launch supports FamilyMart members" },
                    { key: "home.goals.point.b2", fallback: "Exchange crypto with points" },
                ],
            },
        ],
    },
    {
        key: "balanced",
        labelKey: "home.goals.balanced",
        fallbackLabel: "Balanced",
        items: [
            {
                key: "grid",
                titleKey: "home.goals.grid.title",
                fallbackTitle: "Grid Bot",
                descKey: "home.goals.grid.desc",
                fallbackDesc: "Non-stop 24/7",
                icon: "/assets/download/robot.svg",
                bullets: [
                    { key: "home.goals.grid.b1", fallback: "Automated buy low, sell high" },
                    { key: "home.goals.grid.b2", fallback: "One-click by backtest reporting" },
                ],
            },
            {
                key: "spot",
                titleKey: "home.goals.spot.title",
                fallbackTitle: "Spot Trading",
                descKey: "home.goals.spot.desc",
                fallbackDesc: "Various order tools",
                icon: "/assets/download/spotTrading.svg",
                bullets: [
                    { key: "home.goals.spot.b1", fallback: "Quickly trade popular crypto" },
                    { key: "home.goals.spot.b2", fallback: "Well-suited trend chart" },
                ],
            },
            {
                key: "autoinvest",
                titleKey: "home.goals.auto.title",
                fallbackTitle: "Auto-Invest",
                descKey: "home.goals.auto.desc",
                fallbackDesc: "Best choice for amortized costs",
                icon: "/assets/download/autoInvest.svg",
                bullets: [
                    { key: "home.goals.auto.b1", fallback: "No worries about entry points" },
                    { key: "home.goals.auto.b2", fallback: "Long-term investment in stable growth assets" },
                ],
            },
        ],
    },
    {
        key: "aggressive",
        labelKey: "home.goals.aggressive",
        fallbackLabel: "Aggressive",
        items: [
            {
                key: "api",
                titleKey: "home.goals.api.title",
                fallbackTitle: "API Trading",
                descKey: "home.goals.api.desc",
                fallbackDesc: "For high-frequency trading",
                icon: "/assets/download/apiTrade.svg",
                bullets: [
                    { key: "home.goals.api.b1", fallback: "Professional technical support" },
                    { key: "home.goals.api.b2", fallback: "VIP with favorable transaction fees" },
                ],
            },
        ],
    },
];

export const GoalsShowcase = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(goalTabs[0].key);
    const [selectedMap, setSelectedMap] = useState<Record<string, number>>({
        conservative: 1,
        balanced: 0,
        aggressive: 0,
    });
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const currentTab = useMemo(() => goalTabs.find((tab) => tab.key === activeTab) ?? goalTabs[0], [activeTab]);
    const selectedIndex = selectedMap[activeTab] ?? 0;

    const setSliderRef = (key: string) => (node: HTMLDivElement | null) => {
        sliderRefs.current[key] = node;
    };

    const scrollToIndex = (index: number) => {
        const slider = sliderRefs.current[activeTab];
        if (!slider) return;
        const child = slider.children[index] as HTMLElement | undefined;
        child?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    };

    const handleArrow = (direction: -1 | 1) => {
        const itemsLength = currentTab.items.length;
        const nextIndex = (selectedIndex + direction + itemsLength) % itemsLength;
        setSelectedMap((prev) => ({ ...prev, [activeTab]: nextIndex }));
        scrollToIndex(nextIndex);
    };

    const handleTabClick = (key: string) => {
        setActiveTab(key);
        requestAnimationFrame(() => scrollToIndex(selectedMap[key] ?? 0));
    };

    return (
        <GoalsWrapper>
            <div className="goals-bg-left" />
            <div className="goals-bg-right" />
            <div className="goals-title">
                <h2 className="title-text">{t("home.goals.title", "Move even closer to your goals.")}</h2>
                <div className="title-line" />
                <p className="title-desc">
                    {t("home.goals.desc1", "Accomplish investment goals,")}
                    <br />
                    {t("home.goals.desc2", "Start by choosing what fits you.")}
                </p>
                <div className="tabs-box">
                    {goalTabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            className={clsx("tab-item", { active: tab.key === activeTab })}
                            onClick={() => handleTabClick(tab.key)}
                        >
                            {t(tab.labelKey, tab.fallbackLabel)}
                        </button>
                    ))}
                </div>
                <div className="goals-content">
                    <div className="items-wrapper" ref={setSliderRef(currentTab.key)}>
                        {currentTab.items.map((item, index) => (
                            <div
                                key={item.key}
                                className={clsx("content-item", { selected: index === selectedIndex })}
                                onMouseEnter={() => {
                                    setSelectedMap((prev) => ({ ...prev, [activeTab]: index }));
                                    scrollToIndex(index);
                                }}
                            >
                                <img className="content-item-img" src={item.icon} alt={item.fallbackTitle} />
                                <span className="content-item-title">
                                    {t(item.titleKey, item.fallbackTitle)}
                                </span>
                                <span className="content-item-desc">{t(item.descKey, item.fallbackDesc)}</span>
                                <div className="content-item-icon">
                                    <ArrowIcon />
                                </div>
                                <div className="content-item-info">
                                    {item.bullets.map((bullet) => (
                                        <span key={bullet.key}>{t(bullet.key, bullet.fallback)}</span>
                                    ))}
                                </div>
                                <div className="content-item-btn">
                                    <ArrowIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="goals-arrow">
                    <button type="button" className="left" onClick={() => handleArrow(-1)} aria-label="prev">
                        <ArrowIcon />
                    </button>
                    <button type="button" className="right" onClick={() => handleArrow(1)} aria-label="next">
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </GoalsWrapper>
    );
};

const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289C10.9024 5.68342 10.9024 6.31658 11.2929 6.70711L15.5858 11H6C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H15.5858L11.2929 17.2929C10.9024 17.6834 10.9024 18.3166 11.2929 18.7071C11.6834 19.0976 12.3166 19.0976 12.7071 18.7071L18.7071 12.7071C19.0976 12.3166 19.0976 11.6834 18.7071 11.2929L12.7071 5.29289Z"
            fill="currentColor"
        />
    </svg>
);

const GoalsWrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(50, 96, 239);
    padding: 50px 0 35px;
    overflow: hidden;
    color: #fff;
    .goals-bg-left {
        position: absolute;
        left: -150px;
        bottom: 0;
        width: 660px;
        height: 750px;
        opacity: 0.1;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
    }
    .goals-bg-right {
        position: absolute;
        right: -500px;
        top: -200px;
        width: 660px;
        height: 750px;
        opacity: 0.05;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
    }
    .goals-title {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        z-index: 1;
    }
    .title-text {
        text-align: center;
        margin-bottom: 24px;
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(119deg, rgb(211, 223, 253) 0%, rgb(183, 200, 255) 56.36%) text;
        -webkit-text-fill-color: transparent;
    }
    .title-line {
        width: 25px;
        height: 3px;
        margin: 0 auto 20px;
        background: linear-gradient(119deg, rgb(172, 145, 116) 0%, rgb(221, 190, 149) 100%);
    }
    .title-desc {
        margin-bottom: 40px;
        font-size: 32px;
        font-weight: 500;
        line-height: 1.25;
        text-align: center;
    }
    .tabs-box {
        width: 342px;
        height: 48px;
        display: flex;
        margin: 0 auto 56px;
        border-radius: 100px;
        background-color: #fff;
        overflow: hidden;
        .tab-item {
            flex: 1;
            border: none;
            background: transparent;
            color: rgb(75, 88, 111);
            font-size: 16px;
            cursor: pointer;
            border-radius: 100px;
            transition: all 0.3s ease;
            &.active {
                margin: 4px;
                color: #fff;
                background-color: rgb(49, 95, 238);
            }
        }
    }
    .goals-content {
        width: 980px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        padding-bottom: 50px;
    }
    .items-wrapper {
        display: flex;
        gap: 24px;
        scroll-snap-type: x mandatory;
        overflow-x: auto;
        padding-bottom: 20px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .content-item {
        width: 320px;
        height: 320px;
        flex-shrink: 0;
        border-radius: 16px;
        background: #fff;
        position: relative;
        transform: scale(0.9);
        opacity: 0.8;
        transition: all 0.5s ease-in-out;
        overflow: hidden;
        color: #10141f;
        scroll-snap-align: center;
        padding: 0 16px 16px;
        .content-item-img {
            margin: 40px auto 0;
            width: 70px;
            height: 70px;
            display: block;
        }
        .content-item-title {
            text-align: center;
            font-size: 28px;
            margin: 39px 0 12px;
            font-weight: 700;
            display: block;
        }
        .content-item-desc {
            text-align: center;
            margin-bottom: 24px;
            color: rgb(75, 88, 111);
            font-size: 17px;
            display: block;
        }
        .content-item-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgb(237, 240, 247);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            color: rgb(49, 95, 238);
        }
        .content-item-info {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-left: 16px;
            position: absolute;
            top: 320px;
            transition: all 0.5s ease-in-out;
            span {
                margin-bottom: 12px;
                padding-left: 14px;
                color: rgb(16, 20, 31);
                font-size: 17px;
                font-weight: 400;
                position: relative;
                &:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgb(172, 145, 116);
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }
            }
        }
        .content-item-btn {
            width: 120px;
            height: 32px;
            border-radius: 72px;
            background: rgb(60, 120, 237);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 320px;
            color: #fff;
        }
        &.selected {
            transform: scale(1);
            opacity: 1;
            .content-item-info {
                top: 140px;
            }
            .content-item-btn {
                top: 260px;
            }
        }
    }
    .goals-arrow {
        position: absolute;
        width: 80px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: #fff;
        }
        .left {
            transform: rotate(180deg);
        }
    }
`;

