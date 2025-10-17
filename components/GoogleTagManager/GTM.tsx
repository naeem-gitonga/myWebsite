'use client';
import Script from 'next/script';

export default function GTM(props?: any): JSX.Element {
  return (
    <>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-00FHGBS0KW"
            strategy="afterInteractive"
        />
        <Script
                id={`gtag-manager${props.name}`}
                type="text/javascript"
            >
                {
                `window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments)  }
                gtag('js', new Date());
                gtag('config', 'G-00FHGBS0KW');`
                }
            </Script>
        </>
  );
}
