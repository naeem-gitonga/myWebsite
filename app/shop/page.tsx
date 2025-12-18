import Footer from 'components/Footer/Footer';
import ShopView from 'components/ShopView/ShopView';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import '../globals.css';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Shop",
    description:
      'Learn how JavaScript default parameters affect code execution time by Naeem Gitonga',
  };
}

export default async function Books(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ShopView />
      <Footer />
    </>
  );
}
