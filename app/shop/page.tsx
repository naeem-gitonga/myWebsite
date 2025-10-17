import Footer from 'components/Footer/Footer';
import ShopView from 'components/ShopView/ShopView';
import '../globals.css';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Shop",
    description:
      'Learn how JavaScript default parameters affect code execution time by Naeem Gitonga',
  };
}

export default function Books(): JSX.Element {
  return (
    <>
      <ShopView />
      <Footer />
    </>
  );
}
