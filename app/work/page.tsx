import Footer from 'components/Footer/Footer';
import '../globals.css';
import MyWork from 'components/MyWork/MyWork';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import { Metadata } from 'next';

// * example of static metadata
export const metadata: Metadata = {
  title: 'My Work',
  description:
    'Projects that Naeem Gitonga has created himself or with product teams. Some projects date back to 2017 and should demonstrate growth.',
};

export default async function Work(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <MyWork />
      <Footer />
    </>
  );
}
