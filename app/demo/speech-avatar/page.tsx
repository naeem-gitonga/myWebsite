import type { Metadata } from 'next';
import Footer from 'components/Footer/Footer';
import SpeechAvatar from '@/components/SpeechAvatar/SpeechAvatar';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import PageHeader from '@/components/PageHeader/PageHeader';
import { getAbsoluteUrl, siteConfig } from '@/utils/siteConfig';
import '../../globals.css';

export function generateMetadata(): Metadata {
  const title = 'Speech Avatar Demo';
  const description = '"Real-time" Conversational Speech Avatar demo running on H100 x 8 GPU.';
  const imageUrl = getAbsoluteUrl('/images/headshot-square-og.jpg');
  const pageUrl = getAbsoluteUrl('/demo/speech-avatar');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.siteName,
      locale: 'en_US',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 627,
        alt: 'Naeem Gitonga - Speech Avatar Demo',
        type: 'image/jpeg',
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

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
