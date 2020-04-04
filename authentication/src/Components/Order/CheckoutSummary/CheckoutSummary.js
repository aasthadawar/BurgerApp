import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from '../CheckoutSummary/CheckoutSummary.module.css'

const CheckoutSummary=(props)=>{
    return(
        <div className={styles.CheckoutSummary}>
            <h1>we hope it taste well</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger
                ingredients={props.ingredients}
                />
            </div>
            <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutContinued} btnType="Success">CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;