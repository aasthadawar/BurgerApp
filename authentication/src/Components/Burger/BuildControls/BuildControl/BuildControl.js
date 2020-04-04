import React from 'react';
import styles from '../BuildControl/BuildControl.module.css';

const BuildControl =(props)=>{
    return(
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button disabled={props.disabled}
            onClick={props.removed} className={styles.Less}>Less</button>
            <button className={styles.More} onClick={props.added}>More</button>
        </div>
    );
}

export default BuildControl;