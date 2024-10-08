import React from 'react';
import styles from './Footer.module.scss';
import logo from '@/static/image/logo_white.png';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <Image src={logo} alt="Logo"/>
        </footer>
    );
};

export default Footer;