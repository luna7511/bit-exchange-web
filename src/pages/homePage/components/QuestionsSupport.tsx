import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const questionItems = [
    {
        key: "home.questions.beginner",
        fallbackTitle: "Begin's Guide",
        descKey: "home.questions.beginner.desc",
        fallbackDesc: "We guide you into the world of cryptocurrency.",
        icon: "/assets/img/home/question/question1.webp",
    },
    {
        key: "home.questions.service",
        fallbackTitle: "Online customer service",
        descKey: "home.questions.service.desc",
        fallbackDesc: "Answer all questions to solve your problems.",
        icon: "/assets/img/home/question/question2.webp",
    },
    {
        key: "home.questions.antifraud",
        fallbackTitle: "Anti-fraud zone",
        descKey: "home.questions.antifraud.desc",
        fallbackDesc: "Stop! Look! Listen! Carefully protect your assets together.",
        icon: "/assets/img/home/question/question3.webp",
    },
];

export const QuestionsSupport = () => {
    const { t } = useTranslation();
    return (
        <QuestionWrapper>
            <div className="blue-bg" />
            <div className="question-box">
                <div className="question-bottom" />
                <div className="question-left" />
                <div className="question-main">
                    <div className="main-big-bg" />
                    <div className="main-bg" />
                    <div className="question-title">{t("home.questions.title", "QUESTIONS")}</div>
                    <div className="question-desc">
                        {t("home.questions.subtitle", "We will definitely answer your questions")}
                    </div>
                    <div className="question-list">
                        {questionItems.map((item) => (
                            <button className="question-item" key={item.key} type="button">
                                <img className="question-item-icon" src={item.icon} alt={item.fallbackTitle} />
                                <div className="question-item-content">
                                    <div className="question-item-title">{t(item.key, item.fallbackTitle)}</div>
                                    <div className="question-item-desc">
                                        {t(item.descKey, item.fallbackDesc)}
                                    </div>
                                </div>
                                <div className="question-arrow">
                                    <ArrowIcon />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </QuestionWrapper>
    );
};

const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ color: "#315FEE" }} xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
            fill="currentColor"
        />
    </svg>
);

const QuestionWrapper = styled.section`
    width: 100%;
    display: flex;
    height: 750px;
    background: rgb(247, 249, 253);
    position: relative;
    .blue-bg {
        width: 380px;
        height: 100%;
        background: rgb(49, 95, 238);
    }
    .question-box {
        flex: 1;
        height: 100%;
        position: relative;
    }
    .question-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 135px;
        background: rgb(230, 214, 192);
        z-index: 1;
    }
    .question-left {
        position: absolute;
        left: 0;
        top: 0;
        height: 626px;
        transform: translateX(-100%);
        width: 332px;
        background: radial-gradient(circle, rgba(49, 95, 238, 0.4), transparent);
    }
    .question-main {
        width: 1130px;
        height: 100%;
        padding-top: 40px;
        background: rgb(247, 249, 253);
        position: relative;
    }
    .main-bg {
        position: absolute;
        top: 152px;
        left: 0;
        width: 161px;
        height: 323px;
        background-color: rgb(247, 249, 253);
        border-radius: 0 161px 161px 0;
    }
    .main-big-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 311px;
        height: 626px;
        background-color: rgb(235, 240, 253);
        border-radius: 0 311px 311px 0;
    }
    .question-title {
        position: relative;
        margin-left: 245px;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 1.5;
        color: rgb(172, 145, 116);
    }
    .question-desc {
        margin-left: 245px;
        margin-bottom: 48px;
        font-size: 32px;
        color: rgb(16, 20, 31);
        font-weight: 700;
        position: relative;
    }
    .question-list {
        display: flex;
        flex-direction: column;
        margin-left: 340px;
        position: relative;
        width: 650px;
        gap: 36px;
    }
    .question-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 16px 32px;
        border-radius: 100px;
        background: rgb(255, 255, 255);
        cursor: pointer;
        border: none;
        text-align: left;
        transition: box-shadow 0.2s ease;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.1) 0 4px 30px 0;
        }
    }
    .question-item-icon {
        width: 36px;
        height: 36px;
    }
    .question-item:nth-of-type(1) {
        margin-right: 50px;
    }
    .question-item:nth-of-type(2) {
        margin-left: 50px;
    }
    .question-item:nth-of-type(3) {
        margin-right: 50px;
    }
    .question-item-content {
        flex: 1;
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
    .question-item-title {
        color: rgb(16, 20, 31);
        font-size: 20px;
        font-weight: 700;
    }
    .question-item-desc {
        font-size: 17px;
        color: rgb(75, 88, 111);
    }
`;

