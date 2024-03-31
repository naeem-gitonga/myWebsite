import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import Home from 'components/Icons/Home';
import Link from 'next/link';
import styles from './PageHeader.module.scss';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import Shop from '../Icons/Shop';

type PageHeaderProps = { headerName: string; hideLinks: boolean };
export default function PageHeader(props: PageHeaderProps): JSX.Element {
  const { headerName, hideLinks } = props;
  const { homeSize, shopSize, threeItemWrapper } = styles;
  const { sectionHeader2, headerWrapper } = sharedStyles;
  return (
    <div className={headerWrapper}>
      <h2 className={sectionHeader2}>{headerName}</h2>
      {!hideLinks && (
        <div className={threeItemWrapper}>
          <Link href="/" className={homeSize}>
            <Home fill="black" />
          </Link>
          <Link href="/shop" className={shopSize}>
            <Shop />
          </Link>
          <ShoppingCartIcon unsetPosition fill="black" />
        </div>
      )}
    </div>
  );
}
