type Price = {
  price: number;
  priceStyle: string;
  promotion: number;
  strike: string;
};
export default function Price(props: Price): JSX.Element {
  const { priceStyle, promotion, strike, price } = props;

  return (
    <>
      <h2 className={`${priceStyle} ${promotion !== 0 ? strike : ''}`}>
        ${price}
      </h2>
      {promotion !== 0 && <h2 className={priceStyle}>${promotion}</h2>}
    </>
  );
}
