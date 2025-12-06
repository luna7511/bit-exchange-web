import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import Icon1 from "@/assets/img/home/tips1.webp";
import Icon2 from "@/assets/img/home/tips2.webp";
import Icon3 from "@/assets/img/home/tips3.webp";
import Icon4 from "@/assets/img/home/tips4.webp";

type CoinInfo = {
    symbol: string;
    logo: string;
};

const fallbackCoins: CoinInfo[] = [
    { symbol: "BTC", logo: "/assets/partner/1.png" },
    { symbol: "ETH", logo: "/assets/partner/2.png" },
    { symbol: "SOL", logo: "/assets/partner/3.png" },
    { symbol: "XRP", logo: "/assets/partner/4.png" },
    { symbol: "BNB", logo: "/assets/partner/5.png" },
    { symbol: "DOGE", logo: "/assets/partner/6.png" },
    { symbol: "MATIC", logo: "/assets/partner/7.png" },
    { symbol: "DOT", logo: "/assets/partner/8.png" },
];

const tips = [
    {
        icon: Icon1,
        textKey: "home.iconSwipe.tip1",
        fallback: 'BitoPro has completed the "VASP AML Registration Regulations"',
    },
    {
        icon: Icon2,
        textKey: "home.iconSwipe.tip2",
        fallback: "World's best-known standard for security",
    },
    {
        icon: Icon3,
        textKey: "home.iconSwipe.tip3",
        fallback: "AAA Security Rating Among Top Crypto Exchanges",
    },
    {
        icon: Icon4,
        textKey: "home.iconSwipe.tip4",
        fallback: "Direction of Information Security Standards for the Virtual Currency Industry",
    },
];

export const IconSwipe = () => {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let position = 0;
        const speed = 2;
        const step = () => {
            position += speed;
            if (position >= container.scrollWidth - container.clientWidth - 1) {
                position = 0;
            }
            container.scrollTo({ left: position });
        };
        const timer = window.setInterval(step, 30);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <IconWrapper>
            <div className="seamless-warp">
                <div className="scroll-container" ref={scrollRef}>
                    <div className="scroll-content">
                        {fallbackCoins.concat(fallbackCoins).map((coin, index) => (
                            <div className="imgBox" key={`${coin.symbol}-${index}`}>
                                <img src={coin.logo} alt={coin.symbol} className="img" />
                                <div className="iconName">{coin.symbol}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="tips-box">
                {tips.map((tip) => (
                    <div className="tips-item" key={tip.textKey}>
                        <img src={tip.icon} alt="tip" />
                        <div className="tips-text">{t(tip.textKey, tip.fallback)}</div>
                    </div>
                ))}
            </div>
        </IconWrapper>
    );
};

const IconWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(119deg, rgb(211, 223, 253) 0%, rgb(49, 95, 238) 23.88%);
    .seamless-warp {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 20px 0;
    }
    .scroll-container {
        overflow: hidden;
        width: 100%;
    }
    .scroll-content {
        display: flex;
        align-items: center;
        width: max-content;
    }
    .imgBox {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
        height: 60px;
    }
    .img {
        height: 35px;
        width: 35px;
        object-fit: contain;
        margin-right: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
    }
    .iconName {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
    }
    .tips-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 0;
        flex-wrap: wrap;
        background-color: rgba(247, 249, 253, 0.98);
        gap: 24px;
    }
    .tips-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 56px;
        gap: 12px;
    }
    .tips-item img {
        width: 120px;
        height: 60px;
        object-fit: contain;
    }
    .tips-text {
        font-size: 17px;
        line-height: 30px;
        text-align: left;
        color: #111;
    }
`;

