import Link from 'next/link';
import styles from './PromoBanner.module.scss';

export default function PromoBanner() {
  const { bannerLink, text, promoBanner } = styles
  const bannerText = process.env.NEXT_PUBLIC_PROMO_BANNER_TEXT;
  const showPromoBanner = process.env.NEXT_PUBLIC_SHOW_PROMO_BANNER;
  return (
    <div id="promo-banner" className={promoBanner}>
      {showPromoBanner == 'true' && (
          <p id="banner-text" className={text}>
              <Link id="banner-link" className={bannerLink} href="/item?item_id=2">
            {bannerText}
        </Link>
          </p>
      )}
    </div>
  );
}
