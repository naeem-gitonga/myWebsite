import Footer from 'components/Footer/Footer';
import '../globals.css';
import ItemView from '@/components/ItemView/ItemView';
import type { Metadata, ResolvingMetadata } from 'next';
import { products } from '../../utils/products';
import { truncateStringWithEllipsis } from '@/utils/truncateString';

type Props = {
  params: Promise<{ item_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { searchParams } = props;
  const {item_id} = await searchParams;
  const id = item_id && +item_id;
  const product = products.find((p) => p.id === id);
  const description = truncateStringWithEllipsis(
    product?.description as string
  );
  return {
    title: `${product?.title} by Naeem Gitonga`,
    description: description,
  };
}

export default function Item(): JSX.Element {
  return (
    <>
      <ItemView />
      <Footer />
    </>
  );
}
