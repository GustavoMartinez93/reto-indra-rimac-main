import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as RimacIcon } from '../../../../icons/Ic-rimac.svg';
import { ReactComponent as PhoneIcon } from '../../../../icons/Ic-phone.svg';

const Header = () => {
  return (
    <header className={styles.header}>
        <RimacIcon></RimacIcon>
        <div className={styles['phone']}>
            <p className={styles['buy-text']}>¡Compra por este medio!</p>
            <PhoneIcon></PhoneIcon>
            <p className={styles['phone-text']}><strong>(01) 411 6001</strong></p>
        </div>
    </header>
  );
};

export default Header;