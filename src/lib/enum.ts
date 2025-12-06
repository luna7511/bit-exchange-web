export enum KlineIntervalEnum {
    ONE_MIN = "ONE_MIN",
    FIVE_MIN = "FIVE_MIN",
    FIFTEEN_MIN = "FIFTEEN_MIN",
    THIRTY_MIN = "THIRTY_MIN",
    ONE_HOUR = "ONE_HOUR",
    TWO_HOUR = "TWO_HOUR",
    SIX_HOUR = "SIX_HOUR",
    ONE_DAY = "ONE_DAY",
    TWO_DAY = "TWO_DAY",
    SEVEN_DAY = "SEVEN_DAY",
}

export enum StatusEnum {
    Closed = 0,
    Open = 1,
}

export enum MarketEnum {
    BINANCE = "binance",
    NASDAQ = "NASDAQ",
    FC = "FC"
}


export enum SSETypeENum {
    // 币种详情
    DETAIL = "DETAIL",
    // K线
    KLINE = "KLINE",
    // 交易数据
    TRADE = "TRADE",
    // 心跳
    HEARTBEAT = "HEARTBEAT",
    // 结算
    SETTLEMENT = "SETTLEMENT",
    // 持仓变化
    POSITION = "POSITION",
    // 用户账号冻结
    USER_STATUS = "USER_STATUS",
    // 申购
    OWNCOIN = "OWNCOIN",
}