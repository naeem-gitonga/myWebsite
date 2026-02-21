import Link from 'next/link';
import styles from './StartMenu.module.scss';
import useEnvConfig from '@/hooks/useEnvConfig';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';

type StartMenuProps = {
  onClose: () => void;
};

const { menu, menuList, menuLink, contact } = styles;

export default function StartMenu({ onClose }: StartMenuProps): React.JSX.Element {
  const envConfig = useEnvConfig();
  const showShop = envConfig.SHOW_SHOP === 'true';

  return (
    <nav className={menu}>
      <ul className={menuList}>
        <li>
          <Link href="/" onClick={onClose} className={menuLink}>
            home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={onClose} className={menuLink}>
            aboutMe
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={onClose} className={`${menuLink} ${contact}`}>
            contact
          </Link>
        </li>
        <li>
          <Link href="/work" onClick={onClose} className={menuLink}>
            myWork
          </Link>
        </li>
        <li>
          <Link href="/articles" onClick={onClose} className={menuLink}>
            myArticles
          </Link>
        </li>
        {showShop && (
          <li>
            <Link href="/shop" onClick={onClose} className={menuLink}>
              shop
            </Link>
          </li>
        )}
        <li>
          <Link href="/cart" onClick={onClose} className={menuLink}>
            cart
            <ShoppingCartIcon unsetPosition={true} fill="black" />
          </Link>
        </li>
        <li>
          <Link href="/donate" onClick={onClose} className={menuLink}>
            send me bitcoin
          </Link>
        </li>
      </ul>
    </nav>
  );
}
