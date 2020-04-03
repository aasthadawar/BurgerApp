import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from '../SideDrawer/SideDrawer.module.css';
import Aux from '../../../hoc/Auxs/Auxs';
import Backdrop from '../../UI/Backdrop/Backdrop';


const SideDrawer=(props)=>{
    let attachedClasses = [styles.SideDrawer,styles.Close];
    if(props.open){
        attachedClasses=[styles.SideDrawer,styles.Open];
    }
    return(
        <Aux>
            <Backdrop clicked={props.closed}
             show={props.open}/>
            <div className={attachedClasses.join(' ')}>
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );
}

export default SideDrawer;