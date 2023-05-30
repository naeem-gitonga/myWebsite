import styles from './Donate.module.css';

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
        data-address="1AQvJVdD2KjNbyT3GuvW84GVMJySoaubQH"
      >
        <h1 className={donate}>Donate Me Bitcoin</h1>
        <p className={aboutDonate}>
          Everyone has some sort of digital tin cup... here&apos;s mine. So if you find value in anything here, put something in the pot.
        </p>
        <div className={btcQRCode}>
          <img
            className={qRCode}
            src="https://d2j3yisnywcb30.cloudfront.net/pix/sharable-wallet-addr.png"
          />
        </div>
        <p className={aboutDonate}>1AQvJVdD2KjNbyT3GuvW84GVMJySoaubQH</p>
      </div>
    </section>
  );
}
