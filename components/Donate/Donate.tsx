import styles from './Donate.module.scss';
import srcImage from '../pictures/sharable-wallet-addr.png';

export default function Donate(): JSX.Element {
  const {
    donateSection,
    donate,
    aboutDonate,
    btcQRCode,
    qRCode,
    donateContainer,
  } = styles;
  return (
    <section className={`${donateSection} animated`} id="donate">
      <div
        className={donateContainer}
        data-address="1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7"
      >
        <h1 className={donate}>Donate Me Bitcoin</h1>
        <p className={aboutDonate}>
          Everyone has some sort of digital tin cup... here&apos;s mine. So if
          you find value in anything here, put something in the pot.
        </p>
        <div className={btcQRCode}>
          <img
            alt="QR code for my Bitcoin wallet"
            className={qRCode}
            src={srcImage.src}
          />
        </div>
        <p className={aboutDonate}>1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7</p>
      </div>
    </section>
  );
}
