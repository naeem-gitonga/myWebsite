import Footer from 'components/Footer/Footer';
import '../globals.css';
import ItemView from '@/components/ItemView/ItemView';

export default function Item(): JSX.Element {
  return (
    <>
      <ItemView />
      <Footer />
    </>
  );
}
