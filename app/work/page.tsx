import Footer from 'components/Footer/Footer';
import '../globals.css';
import MyWork from 'components/MyWork/MyWork';
import { Metadata } from 'next';
type Props = {
  params: { item_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// * example of static metadata
export const metadata: Metadata = {
  title: 'My Work',
  description:
    'Projects that Naeem Gitonga has created himself or with product teams. Some projects date back to 2017 and should demonstrate growth.',
};

export default function Work(): JSX.Element {
  return (
    <>
      <MyWork />
      <Footer />
    </>
  );
}
