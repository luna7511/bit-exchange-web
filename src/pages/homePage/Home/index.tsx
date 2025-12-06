// import { useCallback, useState } from 'react';

import { Banner } from '@/pages/homePage/components/Banner';
import { AssetsSecurity } from '@/pages/homePage/components/AssetsSecurity';
import { GoalsShowcase } from '@/pages/homePage/components/GoalsShowcase';
import { GroupStats } from '@/pages/homePage/components/GroupStats';
import { IconSwipe } from '@/pages/homePage/components/IconSwipe';
import { QuestionsSupport } from '@/pages/homePage/components/QuestionsSupport';
import { QuoteBoard } from '@/pages/homePage/components/QuoteBoard';
import { QuickStart } from '@/pages/homePage/components/QuickStart';

const Home = () => {

  return (
    <main id='homeScrollContainer'>
      <Banner />
      <IconSwipe />
      <QuoteBoard />
      <AssetsSecurity />
      <GroupStats />
      <GoalsShowcase />
      <QuickStart />
      <QuestionsSupport />
    </main>
  );
};

export default Home;
