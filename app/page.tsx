'use client';
import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import AboutMe from '@/components/AboutMe/AboutMe';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import useParticles from '@/hooks/useParticles';
import useInfoLog from '@/hooks/useInfoLog';
import MyWork from '@/components/MyWork/MyWork';
import Script from 'next/script';

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useParticles();
  useInfoLog();
  console.log({ pathname, searchParams: searchParams?.toString() });
  const [whichSection, setWhichSection] = useState('aboutMe');
  const Section = (): JSX.Element | null => {
    switch (whichSection) {
      case 'aboutMe':
        return <AboutMe />;
      case 'contact':
        return <ContactForm />;
      case 'myWork':
        return <MyWork />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.root}>
      {/* <Script src="https://use.fontawesome.com/804fb94b8b.js"></Script>
        <Script
          type="text/javascript"
          src="https://d2j3yisnywcb30.cloudfront.net/particles.js"
        ></Script> */}
      <div id="particles-js" className={styles.particles} />
      <Header setWhichSection={setWhichSection} />
      <Section />
      <Footer />
    </div>
  );
}
