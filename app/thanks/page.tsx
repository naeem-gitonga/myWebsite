import Footer from 'components/Footer/Footer';
import '../globals.css';
import ThanksView from '@/components/PaymentResponseMessage/ThanksView';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Thank you!",
    description:
      'Thank you for your purchase by Naeem Gitonga',
  };
}

export default async function Thanks(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ThanksView />
      <Footer />
    </>
  );
}
