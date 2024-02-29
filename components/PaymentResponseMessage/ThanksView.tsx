import Link from 'next/link';
import PageHeader from '../PageHeader/PageHeader';
import styles from './PaymentResponseMessage.module.scss';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import canBeParsedToInt from '@/utils/canBeparsedToInt';

export default function ThanksView(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {' '}
      <ThanksContent />
    </Suspense>
  );
}

function ThanksContent(): JSX.Element {
  const searchParams = useSearchParams();

  const referenceId = searchParams?.get('referenceId');
  const ftseParam = searchParams?.get('ftse');
  const [_isNumber, ftse] = canBeParsedToInt(ftseParam as unknown as string);
  const { thanksViewWrapper, width300Center } = styles;
  return (
    <div className={thanksViewWrapper}>
      <PageHeader headerName="thank you!" hideLinks={false} />
      <div className={width300Center}>
        <p className={'firstP'}>
          Awesome! We have successfully processed your payment.
        </p>
        <p>
          Please check your email for your confirmation. Check your spam folder
          if you do not see it in your inbox.
        </p>
        {ftse !== 1 ? (
          <>
            <p>
              Your payment reference ID is <strong>{referenceId}</strong>.
            </p>
            <p>
              Should you experience any complications with your order please
              email{' '}
              <Link href="mailto:gtngbooks@gmail.com">gtngbooks@gmail.com</Link>{' '}
              with your reference ID and concern.
            </p>
          </>
        ) : (
          <p>
            We were unsuccessful at sending your confirmation email! Please
            accept our apologies. Contact us at{' '}
            <Link href="mailto:gtngbooks@gmail.com">gtngbooks@gmail.com</Link>{' '}
            and reference your order number: <strong>{referenceId}</strong>{' '}
          </p>
        )}
        <p>And again, thank you!</p>
      </div>
    </div>
  );
}
