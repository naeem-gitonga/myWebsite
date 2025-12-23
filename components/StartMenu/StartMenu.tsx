import Link from 'next/link';
import styles from './StartMenu.module.scss';
import useEnvConfig from '@/hooks/useEnvConfig';

type StartMenuProps = {
  onClose: () => void;
};

export default function StartMenu({ onClose }: StartMenuProps): React.JSX.Element {
  const envConfig = useEnvConfig();
  const showShop = envConfig.SHOW_SHOP === 'true';

  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li>
          <Link href="/about" onClick={onClose} className={styles.menuLink}>
            aboutMe
          </Link>
        </li>
        <li>
          <Link href="/work" onClick={onClose} className={styles.menuLink}>
            myWork
          </Link>
        </li>
        <li>
          <Link href="/articles" onClick={onClose} className={styles.menuLink}>
            myArticles
          </Link>
        </li>
        {showShop && (
          <li>
            <Link href="/shop" onClick={onClose} className={styles.menuLink}>
              shop
            </Link>
          </li>
        )}
        <li>
          <Link href="/cart" onClick={onClose} className={styles.menuLink}>
            cart
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={onClose} className={styles.menuLink}>
            contact
          </Link>
        </li>
        <li>
          <Link href="/donate" onClick={onClose} className={styles.menuLink}>
            send me bitcoin
          </Link>
        </li>
      </ul>
    </nav>
  );
}
