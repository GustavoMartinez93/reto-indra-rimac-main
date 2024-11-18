import React from 'react';
import styles from './Footer.module.scss';
import { ReactComponent as LogoIcon } from '../../../../icons/Icon-logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles['footer-content']}>
            <LogoIcon></LogoIcon>
            <div>
                <p className={styles['buy-text']}>© 2023 RIMAC Seguros y Reaseguros.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;