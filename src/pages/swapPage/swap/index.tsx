import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import backgroundSvg from "@/assets/img/swap/background.svg?url";
import leftSvg from "@/assets/img/swap/left.svg?url";
import rightSvg from "@/assets/img/swap/right.svg?url";
import smallRightSvg from "@/assets/img/swap/small-right.svg?url";
import feature1Svg from "@/assets/img/swap/feature1.svg?url";
import feature2Svg from "@/assets/img/swap/feature2.svg?url";
import feature3Svg from "@/assets/img/swap/feature3.svg?url";
import { SwapMain } from "./components/SwapMain";

const Swap = () => {
  const { t } = useTranslation("swap");

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部背景栏 */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
        <img
          src={backgroundSvg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 宽屏时显示 left.svg 和 right.svg */}
        <img
          src={leftSvg}
          alt="Left decoration"
          className="absolute left-0 top-0 h-full hidden md:block z-10"
        />
        <img
          src={rightSvg}
          alt="Right decoration"
          className="absolute right-0 top-0 h-full hidden md:block z-10"
        />
        
        {/* 窄屏时显示 small-right.svg */}
        <img
          src={smallRightSvg}
          alt="Small right decoration"
          className="absolute right-0 top-0 h-full md:hidden z-10"
        />
        
        {/* 标题区域 */}
        <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center">
          <Typography 
            variant="h3" 
            className="font-bold mb-2 text-gray-900 text-2xl md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </Typography>
          <Typography 
            variant="h6" 
            className="text-gray-700 text-sm md:text-base lg:text-lg"
          >
            {t("subtitle")}
          </Typography>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-12 lg:pb-16">
        <SwapMain />
      </div>

      {/* 功能特色介绍 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        <Typography 
          variant="h5" 
          className="text-center font-bold text-gray-900 mb-8 md:mb-12 text-2xl md:text-2xl lg:text-4xl"
        >
          {t("features.title")}
        </Typography>
        
        <div className="flex flex-nowrap gap-4 md:gap-6 lg:gap-8 xl:gap-12 justify-center items-start">
          <div className="flex-shrink flex flex-col items-center text-center min-w-0 flex-1">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 flex-shrink-0">
              <img 
                src={feature1Svg} 
                alt="Feature 1" 
                className="w-full h-full object-contain"
              />
            </div>
            <Typography 
              variant="h6" 
              className="font-semibold mb-2 text-sm md:text-base lg:text-lg"
            >
              {t("features.feature1.title")}
            </Typography>
            <Typography 
              variant="body2" 
              className="text-gray-600 text-xs md:text-sm lg:text-base"
            >
              {t("features.feature1.description")}
            </Typography>
          </div>
          
          <div className="flex-shrink flex flex-col items-center text-center min-w-0 flex-1">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 flex-shrink-0">
              <img 
                src={feature2Svg} 
                alt="Feature 2" 
                className="w-full h-full object-contain"
              />
            </div>
            <Typography 
              variant="h6" 
              className="font-semibold mb-2 text-sm md:text-base lg:text-lg"
            >
              {t("features.feature2.title")}
            </Typography>
            <Typography 
              variant="body2" 
              className="text-gray-600 text-xs md:text-sm lg:text-base"
            >
              {t("features.feature2.description")}
            </Typography>
          </div>
          
          <div className="flex-shrink flex flex-col items-center text-center min-w-0 flex-1">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 flex-shrink-0">
              <img 
                src={feature3Svg} 
                alt="Feature 3" 
                className="w-full h-full object-contain"
              />
            </div>
            <Typography 
              variant="h6" 
              className="font-semibold mb-2 text-sm md:text-base lg:text-lg"
            >
              {t("features.feature3.title")}
            </Typography>
            <Typography 
              variant="body2" 
              className="text-gray-600 text-xs md:text-sm lg:text-base"
            >
              {t("features.feature3.description")}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
