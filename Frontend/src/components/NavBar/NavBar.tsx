import React from 'react';
import Image from 'next/image';
import styles from './NavBar.module.scss';
import logo from '@/static/image/logo.png';

interface NavBarProps {
    setActive: (section: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({setActive}) => {
    return (
        <nav className={styles['navbar']}>
            <Image src={logo} alt="Logo" className={styles['navbar__logo']}/>
            <ul className={styles['navbar__items']}>
                <li>
                    <a onClick={()=>setActive('funds')}>Fondos</a>
                </li>
                <li>
                    <a onClick={() => setActive('history')}>Historial</a>
                </li>
            </ul>
            <span className={styles['navbar__user']}>Jhon Doe</span>
        </nav>
    );
};

export default NavBar;