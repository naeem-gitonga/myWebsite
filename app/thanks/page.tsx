import Footer from 'components/Footer/Footer';
import '../globals.css';
import ThanksView from '@/components/PaymentResponseMessage/ThanksView';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Thank you!",
    description:
      'Thank you for your purchase by Naeem Gitonga',
  };
}
export default function Thanks(): JSX.Element {
  return (
    <>
      <ThanksView />
      <Footer />
    </>
  );
}
