export interface PlatformConfig {
    /** DeFi 提前赎回费率 */
    defiEarlyRedeemRate: number;

    /** DeFi 浮动收益率 */
    defiFloatingRate: number;

    /** 数字货币交易费率 */
    digitalCurrencyFeeRate: number;

    /** 最大代理等级 */
    maxAgentLevel: number;

    /** 永续合约最大杠杆 */
    perpMaxLeverage: number;

    /** 永续合约最低追加保证金 */
    perpMinAddMargin: number;

    /** 平台 Logo 地址 */
    platformLogo: string;

    /** 平台名称 */
    platformName: string;

    /** 贵金属交易费率 */
    preciousMetalFeeRate: number;

    /** 股票交易费率 */
    stockTradeFeeRate: number;

    /** 更新时间（ISO 格式字符串） */
    updateTime: string;

    /** 提币手续费率 */
    withdrawFeeRate: number;
}