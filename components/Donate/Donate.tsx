import PageHeader from '../PageHeader/PageHeader';
import styles from './Donate.module.scss';
;

export default function Donate(): React.JSX.Element {
  const {
    donateWrapper,
    donate,
    aboutDonate,
    btcQRCode,
    qRCode,
    donateContainer,
  } = styles;
  return (
    <div id="donate" className={donateWrapper}>
      <PageHeader headerName="donate" hideLinks={false} />
      <div
        className={donateContainer}
        data-address="1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7"
      >
        <p className={aboutDonate}>
          Everyone has some sort of digital tin cup... here&apos;s mine. So if
          you find value in anything here, put something in the pot.
        </p>
        <h1 className={donate}>Donate Me Bitcoin</h1>
        <div className={btcQRCode}>
          <img
            alt="QR code for my Bitcoin wallet"
            className={qRCode}
            src={"/images/sharable-wallet-addr.webp"}
          />
        </div>
        <p className={aboutDonate}>1JyK59AjgcYtv3h8vyGK4L6evwFqZhkDe7</p>
      </div>
    </div>
  );
}
