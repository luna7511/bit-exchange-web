import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type MarketEntry = {
    symbol: string;
    logo: string;
    price: number;
    change: number;
};

type MarketSection = {
    key: string;
    labelKey: string;
    fallbackLabel: string;
    items: MarketEntry[];
};

const sampleMarkets: MarketSection[] = [
    {
        key: "crypto",
        labelKey: "home.quote.crypto",
        fallbackLabel: "Cryptocurrency",
        items: [
            { symbol: "BTC", logo: "/assets/partner/1.png", price: 98765.23, change: 2.13 },
            { symbol: "ETH", logo: "/assets/partner/2.png", price: 3120.11, change: -1.54 },
            { symbol: "SOL", logo: "/assets/partner/3.png", price: 145.32, change: 4.87 },
            { symbol: "XRP", logo: "/assets/partner/4.png", price: 0.72, change: 0.91 },
            { symbol: "DOGE", logo: "/assets/partner/6.png", price: 0.19, change: -0.43 },
        ],
    },
    {
        key: "forex",
        labelKey: "home.quote.forex",
        fallbackLabel: "Forex",
        items: [
            { symbol: "EURUSD", logo: "/assets/partner/5.png", price: 1.0865, change: 0.12 },
            { symbol: "USDJPY", logo: "/assets/partner/7.png", price: 147.85, change: -0.25 },
            { symbol: "GBPUSD", logo: "/assets/partner/8.png", price: 1.276, change: 0.05 },
        ],
    },
    {
        key: "metals",
        labelKey: "home.quote.metals",
        fallbackLabel: "Metals",
        items: [
            { symbol: "XAUUSD", logo: "/assets/partner/2.png", price: 2421.7, change: 0.87 },
            { symbol: "XAGUSD", logo: "/assets/partner/3.png", price: 29.11, change: -0.33 },
        ],
    },
];

const formatPrice = (price: number) => {
    if (price >= 1000) {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(2);
};

export const QuoteBoard = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState(sampleMarkets[0].key);
    const currentSection = useMemo(
        () => sampleMarkets.find((section) => section.key === activeSection) ?? sampleMarkets[0],
        [activeSection]
    );

    return (
        <QuoteWrapper>
            <div className="more">
                <div className="hot">{t("home.quote.title", "市场")}</div>
                <p className="desc">
                    {t("home.quote.desc", "全球加密货币交易市场，支援多种币种交易，安全且有效率")}
                </p>
            </div>
            <div className="tabs">
                {sampleMarkets.map((section) => (
                    <button
                        key={section.key}
                        type="button"
                        className={clsx("tab-item", { active: activeSection === section.key })}
                        onClick={() => setActiveSection(section.key)}
                    >
                        {t(section.labelKey, section.fallbackLabel)}
                    </button>
                ))}
            </div>
            <div className="quote-list">
                {currentSection.items.map((item, index) => (
                    <div className="quote-row" key={item.symbol}>
                        <div className="number">{index + 1}</div>
                        <div className="asset">
                            <img src={item.logo} alt={item.symbol} />
                            <span>{item.symbol}</span>
                        </div>
                        <div className="price">${formatPrice(item.price)}</div>
                        <div className={clsx("change", { up: item.change >= 0, down: item.change < 0 })}>
                            {item.change >= 0 ? "+" : ""}
                            {item.change.toFixed(2)}%
                        </div>
                        <button type="button" className="trade-btn">
                            {t("home.quote.trade", "Trade")}
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" className="view_more">
                {t("home.quote.more", "View more")}
            </button>
        </QuoteWrapper>
    );
};

const QuoteWrapper = styled.section`
    padding: 0 16px;
    margin-top: 48px;
    .more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin-bottom: 24px;
        .hot {
            font-size: 33px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .desc {
            font-size: 18px;
            color: #7e8491;
        }
    }
    .tabs {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 24px;
    }
    .tab-item {
        padding: 10px 20px;
        border-radius: 999px;
        border: 1px solid transparent;
        background: #f5f6fb;
        color: #4b586f;
        cursor: pointer;
        font-size: 15px;
        &.active {
            background: #315fee;
            color: #fff;
        }
    }
    .quote-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .quote-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        flex-wrap: wrap;
        gap: 16px;
    }
    .number {
        width: 40px;
        text-align: center;
        font-weight: 600;
        color: #8a8f9c;
    }
    .asset {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 140px;
        img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
        span {
            font-size: 16px;
            font-weight: 600;
        }
    }
    .price {
        font-size: 18px;
        font-weight: 700;
        color: #10141f;
        min-width: 120px;
        text-align: right;
    }
    .change {
        min-width: 120px;
        text-align: center;
        padding: 8px 12px;
        border-radius: 8px;
        font-weight: 600;
        &.up {
            background: rgba(12, 181, 108, 0.1);
            color: #0cb56c;
        }
        &.down {
            background: rgba(244, 85, 73, 0.1);
            color: #f45549;
        }
    }
    .trade-btn {
        padding: 10px 24px;
        border-radius: 12px;
        background: #111016;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }
    .view_more {
        display: block;
        margin: 30px auto 0;
        font-size: 18px;
        text-decoration: underline;
        color: rgb(49, 95, 238);
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;

