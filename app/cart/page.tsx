import Footer from 'components/Footer/Footer';
import '../globals.css';
import CartVeiw from 'components/CartView/CartView';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Cart",
    description:
      'Shopping cart by Naeem Gitonga',
  };
}

export default function Cart(): JSX.Element {
  return (
    <>
      <CartVeiw />
      <Footer />
    </>
  );
}
