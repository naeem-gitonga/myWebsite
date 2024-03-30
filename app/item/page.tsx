import Footer from 'components/Footer/Footer';
import '../globals.css';
import ItemView from '@/components/ItemView/ItemView';
import type { Metadata, ResolvingMetadata } from 'next';
import { products } from '../../utils/products';
import { truncateStringWithEllipsis } from '@/utils/truncateString';

type Props = {
  params: { item_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata(
  { searchParams }: Props,
  _parent: ResolvingMetadata
): Metadata {
  const id = searchParams.item_id && +searchParams.item_id;
  const product = products.find((p) => p.id === id);
  const description = truncateStringWithEllipsis(
    product?.description as string
  );
  return {
    title: `${product?.title} by Jaha Naeem Gitonga`,
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
