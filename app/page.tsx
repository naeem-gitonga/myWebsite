'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import AboutMe from '@/components/AboutMe/AboutMe';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import useParticles from '@/hooks/useParticles';
import useInfoLog from '@/hooks/useInfoLog';
import MyWork from '@/components/MyWork/MyWork';
import Script from 'next/script';
import Donate from '@/components/Donate/Donate';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';

export default function Home() {
  useParticles();
  useInfoLog();
  const [whichSection, setWhichSection] = useState('');
  const Section = (): JSX.Element | null => {
    switch (whichSection) {
      case 'aboutMe':
        return <AboutMe />;
      case 'contact':
        return <ContactForm />;
      case 'myWork':
        return <MyWork />;
      case 'donate':
        return <Donate />;
      default:
        return <div />;
    }
  };

  return (
    <div className={styles.root}>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-112911264-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'UA-112911264-1');
          `}
      </Script>
      <div id="particles-js" className={styles.particles} />
      <Header setWhichSection={setWhichSection} />
      <Section />
      <Footer />
      <ReturnArrow />
    </div>
  );
}
