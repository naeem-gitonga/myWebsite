'use client';

import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import Home from 'components/Icons/Home';
import Link from 'next/link';
import styles from './PageHeader.module.scss';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import HamburgerMenu from '../Icons/HamburgerMenu';
import Modal from 'components/Modal/Modal';
import useModal from 'hooks/useModal';
import StartMenu from 'components/StartMenu/StartMenu';
import Shop from '../Icons/Shop';

type PageHeaderProps = { headerName: string; hideLinks: boolean };
export default function PageHeader(props: PageHeaderProps): React.JSX.Element {
  const { headerName, hideLinks } = props;
  const { homeSize, iconWrapper, menuSize, shopSize } = styles;
  const { sectionHeader2, headerWrapper } = sharedStyles;
  const [isModalOpen, setModalOpen] = useModal();

  return (
    <>
      <div className={headerWrapper}>
        <h2 className={sectionHeader2}>{headerName}</h2>
        {!hideLinks && (
          <div className={iconWrapper}>
            <Link href="/" className={homeSize}>
              <Home fill="black" />
            </Link>
            <button
              type="button"
              onClick={setModalOpen}
              className={menuSize}
              aria-label="Open menu"
            >
              <HamburgerMenu fill="black" />
            </button>
            <Link href="/shop" className={shopSize}>                                      
              <Shop />                                                                    
            </Link>  
            <ShoppingCartIcon unsetPosition fill="black" />
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} setModalOpen={setModalOpen} hideClose={false}>
        <StartMenu onClose={setModalOpen} />
      </Modal>
    </>
  );
}
