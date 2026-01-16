import Footer from 'components/Footer/Footer';
import SpeechAvatar from '@/components/SpeechAvatar/SpeechAvatar';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import PageHeader from '@/components/PageHeader/PageHeader';
import '../../globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo',
  description: 'Speech avatar demo showcasing video presentation.',
};

export default async function Demo(params: Params): Promise<React.JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? 'direct';
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <div style={{ padding: '10px' }}>
        <PageHeader headerName="demo" hideLinks={false} />
        <SpeechAvatar />
      </div>
      <Footer />
    </>
  );
}
