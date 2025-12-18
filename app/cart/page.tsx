import Footer from 'components/Footer/Footer';
import '../globals.css';
import CartVeiw from 'components/CartView/CartView';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Cart",
    description:
      'Shopping cart by Naeem Gitonga',
  };
}

export default async function Cart(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <CartVeiw />
      <Footer />
    </>
  );
}
