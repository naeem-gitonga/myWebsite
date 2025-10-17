'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from 'components/Header/Header';
import AboutMe from 'components/AboutMe/AboutMe';
import Footer from 'components/Footer/Footer';
import useInfoLog from 'hooks/useInfoLog';
import Script from 'next/script';
import Donate from 'components/Donate/Donate';
import ReturnArrow from 'components/ReturnArrow/ReturnArrow';
import ArticleTileView from 'components/ArticleTileView/ArticleTileView';
import ShoppingCartIcon from 'components/ShoppingCartIcon/ShoppingCartIcon';
import particlesParams from 'utils/particlesParams.json';
import PromoBanner from '@/components/PromoBanner/PromoBanner';

export default function Home() {
  useInfoLog();
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', particlesParams);
    }
  }, []);
  const [whichSection, setWhichSection] = useState('');
  const Section = (): JSX.Element | null => {
    switch (whichSection) {
      case 'aboutMe':
        return <AboutMe />;
      case 'donate':
        return <Donate />;
      case 'articles':
        return <ArticleTileView sharedHeader={false} />;
      default:
        return <div />;
    }
  };

  return (
    <div className={styles.root}>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-00FHGBS0KW"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-manager"
        type="text/javascript"
      >
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments)  }
          gtag('js', new Date());
          gtag('config', 'G-00FHGBS0KW');`
          }
      </Script>
      <PromoBanner />
      <div id="particles-js" className="particles" />
      <Header setWhichSection={setWhichSection} />
      <ShoppingCartIcon unsetPosition={false} fill="white" />
      <Section />
      <Footer />
      <ReturnArrow />
    </div>
  );
}
