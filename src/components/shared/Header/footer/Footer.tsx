import React from 'react';
import styles from './Footer.module.scss';
import { ReactComponent as LogoIcon } from '../../../../icons/Icon-logo.svg';
import { ReactComponent as LogoIconMobile } from '../../../../icons/Icon-logo-mobile.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles['footer-content']}>
            <div className={styles['logo-content']}>
              <LogoIcon></LogoIcon>
            </div>
            <div className={styles['logo-content-mobile']}>
              <LogoIconMobile></LogoIconMobile>
            </div>
            <div className={styles['text-content']}>
              <p className={styles['buy-text']}>© 2023 RIMAC Seguros y Reaseguros.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;