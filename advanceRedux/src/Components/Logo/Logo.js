import React from 'react';
import burgerLogo from '../../assets/images/original.png';
import styles from '../Logo/Logo.module.css'

const Logo = (props)=>{
    return(
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="MyBurger"></img>
        </div>
    );
}

export default Logo;