import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Slider, Select, MenuItem, Paper, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import thumbSvg from "@/assets/img/swap/thumb.svg?url";

type TabType = "buy" | "sell";

interface Currency {
  symbol: string;
  name: string;
  icon?: string;
}

// 模拟币种数据
const fiatCurrencies: Currency[] = [
  { symbol: "TWD", name: "新台币" },
];

const cryptoCurrencies: Currency[] = [
  { symbol: "USDT", name: "泰达币" },
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
];

// 模拟汇率
const exchangeRate = 31.619; // 1 USDT ≈ 31.619 TWD

const balancePercentages = [25, 50, 75, 100];

export const SwapMain = () => {
  const { t } = useTranslation("swap");
  const [activeTab, setActiveTab] = useState<TabType>("buy");
  const [spendAmount, setSpendAmount] = useState<string>("");
  const [balancePercentage, setBalancePercentage] = useState<number>(0);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
  
  // 购买时：花费TWD，获得USDT
  // 卖出时：卖出USDT，获得TWD
  const [spendCurrency, setSpendCurrency] = useState<Currency>(fiatCurrencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>(cryptoCurrencies[0]);

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: TabType) => {
    setActiveTab(newValue);
    setSpendAmount("");
    setBalancePercentage(0);
  }, []);

  const handleSpendAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSpendAmount(value);
    // 根据金额计算百分比（这里简化处理，实际应该基于余额）
    if (value) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        // 假设最大余额为 1000000
        const percentage = (numValue / 1000000) * 100;
        setBalancePercentage(Math.min(100, Math.max(0, percentage)));
      } else {
        setBalancePercentage(0);
      }
    } else {
      setBalancePercentage(0);
    }
  }, []);

  const handleBalancePercentageChange = useCallback((_event: Event, value: number | number[]) => {
    const percentage = Array.isArray(value) ? value[0] : value;
    setBalancePercentage(percentage);
    // 根据百分比计算金额（假设最大余额为 1000000）
    const calculatedAmount = (1000000 * percentage) / 100;
    setSpendAmount(calculatedAmount.toFixed(2));
  }, []);


  // 计算获得的金额
  const receiveAmount = useMemo(() => {
    if (!spendAmount) return "0.00000000";
    const numAmount = parseFloat(spendAmount);
    if (isNaN(numAmount) || numAmount <= 0) return "0.00000000";
    
    if (activeTab === "buy") {
      // 购买：花费TWD，获得USDT
      const usdtAmount = numAmount / exchangeRate;
      return usdtAmount.toFixed(8);
    } else {
      // 卖出：卖出USDT，获得TWD
      const twdAmount = numAmount * exchangeRate;
      return twdAmount.toFixed(2);
    }
  }, [spendAmount, activeTab]);

  const handleSubmit = useCallback(() => {
    console.log("Submit:", { activeTab, spendAmount, receiveAmount });
  }, [activeTab, spendAmount, receiveAmount]);

  return (
    <div className="w-[90%] md:w-[540px] mx-auto mt-[-80px] relative z-20">
      <Paper elevation={2} className="p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg">
        {/* Tab 切换 */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#f3f4f6",
              borderRadius: "9999px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <button
              onClick={() => handleTabChange({} as React.SyntheticEvent, "buy")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "buy"
                  ? "bg-teal-400 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 bg-transparent"
              )}
            >
              {t("tabs.buy")}
            </button>
            <button
              onClick={() => handleTabChange({} as React.SyntheticEvent, "sell")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "sell"
                  ? "bg-rose-400 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 bg-transparent"
              )}
            >
              {t("tabs.sell")}
            </button>
          </Box>
        </Box>

        {/* 即时汇率 */}
        <div className="text-center mb-6">
          <Typography variant="body2" className="text-gray-500 mb-1 text-sm">
            {t("exchangeRate")}
          </Typography>
          <Typography variant="h5" className="font-bold text-gray-900">
            1 USDT ≈ {exchangeRate.toFixed(3)} TWD
          </Typography>
        </div>

        {/* 我想花费/我想卖出 */}
        <div className="mb-6">
          <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
            {activeTab === "buy" ? t("iWantToSpend") : t("iWantToSell")}
          </Typography>
          
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 bg-white hover:border-blue-500 transition-colors">
            {/* 币种选择器 */}
            <Select
              value={spendCurrency.symbol}
              onChange={(e) => {
                const currency = activeTab === "buy" 
                  ? fiatCurrencies.find(c => c.symbol === e.target.value)
                  : cryptoCurrencies.find(c => c.symbol === e.target.value);
                if (currency) setSpendCurrency(currency);
              }}
              IconComponent={ArrowDropDownIcon}
              sx={{
                minWidth: 140,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                },
              }}
            >
              {(activeTab === "buy" ? fiatCurrencies : cryptoCurrencies).map((currency) => (
                <MenuItem key={currency.symbol} value={currency.symbol}>
                  <div className="flex items-center gap-2">
                    {currency.symbol === "TWD" && (
                      <span className="text-blue-600 font-bold text-lg">NT$</span>
                    )}
                    {currency.symbol === "USDT" && (
                      <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">T</span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold">{currency.symbol}</span>
                      <span className="text-xs text-gray-500">{t(`currencies.${currency.symbol}.name`)}</span>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>

            {/* 输入框 */}
            <div className="flex-1 flex items-center justify-between">
              <Input
                type="number"
                value={spendAmount}
                onChange={handleSpendAmountChange}
                placeholder="0"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px 0",
                    fontSize: "18px",
                    fontWeight: 500,
                    textAlign: "right",
                  },
                }}
              />
              <Typography variant="body2" className="text-gray-400 text-xs ml-2 whitespace-nowrap">
                {t("amountRange")}
              </Typography>
            </div>
          </div>

          {/* 百分比滑块 */}
          <div className="mt-4 space-y-2 relative">
            <div 
              className="relative"
              onMouseEnter={() => setIsSliderHovered(true)}
              onMouseLeave={() => setIsSliderHovered(false)}
            >
              <Slider
                value={balancePercentage}
                onChange={handleBalancePercentageChange}
                min={0}
                max={100}
                step={1}
                marks={balancePercentages.map((p) => ({ value: p, label: "" }))}
                sx={{
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e5e7eb",
                    height: 4,
                    opacity: 1,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#3b82f6",
                    height: 4,
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 24,
                    height: 20,
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    opacity: 0,
                    visibility: "hidden",
                    "&:hover": {
                      boxShadow: "none",
                      opacity: 0,
                    },
                    "&:focus": {
                      boxShadow: "none",
                      opacity: 0,
                    },
                    "&:active": {
                      boxShadow: "none",
                      opacity: 0,
                    },
                    "&::before": {
                      display: "none",
                      content: '""',
                    },
                    "&::after": {
                      display: "none",
                      content: '""',
                    },
                  },
                  "& .MuiSlider-mark": {
                    backgroundColor: "transparent",
                    width: 6,
                    height: 8,
                    borderRadius: "3px",
                    border: "2px solid #a7aeb4",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    "&.MuiSlider-markActive": {
                      borderColor: "#315fee",
                      backgroundColor: "#315fee",
                    },
                  },
                  "& .MuiSlider-markLabel": {
                    display: "none",
                  },
                }}
              />
              {/* 使用绝对定位的 img 覆盖 thumb */}
              <img
                src={thumbSvg}
                alt="Slider thumb"
                className="absolute pointer-events-none select-none"
                style={{
                  width: "24px",
                  height: "20px",
                  left: `calc(${balancePercentage}% - 12px)`,
                  top: "45%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              />
              {/* Hover 提示 */}
              {isSliderHovered && balancePercentage > 0 && (
                <div
                  className="absolute pointer-events-none transition-opacity duration-200 z-10"
                  style={{
                    left: `${balancePercentage}%`,
                    bottom: "100%",
                    transform: "translateX(-50%)",
                    marginBottom: "8px",
                  }}
                >
                  <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                    {balancePercentage}%
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500 mx-auto"></div>
                </div>
              )}
            </div>
            {/* 快捷选择按钮 */}
            {/* <div className="flex gap-2 justify-center">
              {balancePercentages.map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => handleBalanceClick(percentage)}
                  className={cn(
                    "px-4 py-1.5 text-sm rounded-md border transition-colors font-medium",
                    balancePercentage === percentage
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                  )}
                >
                  {t(`balancePercentages.${percentage}`)}
                </button>
              ))}
            </div> */}
          </div>
        </div>

        {/* 我会获得 */}
        <div className="mb-6">
          <Typography variant="body2" className="text-gray-700 mb-2 font-medium">
            {t("iWillGet")}
          </Typography>
          
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
            {/* 币种选择器 */}
            <Select
              value={receiveCurrency.symbol}
              onChange={(e) => {
                const currency = activeTab === "buy"
                  ? cryptoCurrencies.find(c => c.symbol === e.target.value)
                  : fiatCurrencies.find(c => c.symbol === e.target.value);
                if (currency) setReceiveCurrency(currency);
              }}
              IconComponent={ArrowDropDownIcon}
              sx={{
                minWidth: 140,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                },
              }}
            >
              {(activeTab === "buy" ? cryptoCurrencies : fiatCurrencies).map((currency) => (
                <MenuItem key={currency.symbol} value={currency.symbol}>
                  <div className="flex items-center gap-2">
                    {currency.symbol === "TWD" && (
                      <span className="text-blue-600 font-bold text-lg">NT$</span>
                    )}
                    {currency.symbol === "USDT" && (
                      <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">T</span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold">{currency.symbol}</span>
                      <span className="text-xs text-gray-500">{t(`currencies.${currency.symbol}.name`)}</span>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>

            {/* 显示金额 */}
            <div className="flex-1 text-right">
              <Typography variant="h6" className="font-semibold text-gray-400 text-lg">
                {receiveAmount}
              </Typography>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
          disabled={!spendAmount || parseFloat(spendAmount) <= 0}
          sx={{
            py: 2,
            fontSize: "18px",
            fontWeight: 600,
            backgroundColor: activeTab === "buy" ? "#3b82f6" : "#ef4444",
            "&:hover": {
              backgroundColor: activeTab === "buy" ? "#2563eb" : "#dc2626",
            },
            "&:disabled": {
              backgroundColor: "#e5e7eb",
              color: "#9ca3af",
            },
            borderRadius: "12px",
            mb: 2,
          }}
        >
          {activeTab === "buy" ? t("loginToBuy") : t("loginToSell")}
        </Button>

        {/* 定期定额链接 */}
        <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
          <AccessTimeIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" className="text-sm">
            {t("recurringPurchase")} &gt;
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

