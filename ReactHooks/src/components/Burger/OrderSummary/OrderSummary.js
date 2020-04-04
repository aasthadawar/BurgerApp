import React from 'react';
import Button from '../../UI/Button/Button';
 import Aux from '../../../hoc/Aux/Aux';
const orderSummary=props=>{
    
        const ingredientsummary=Object.keys(props.ingredients).map(item=>{
            return <li key={item}><span style={{textTransform:'capitalize'}}>{item}</span>:{props.ingredients[item]}</li>
            })
        return((<Aux>
            <h3>Your Order</h3>
            <p>The contents of your order are:</p>
            <ul>
                {ingredientsummary}
            </ul>
            <p><strong>Total price:{props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    
        </Aux>)
    );
}


export default orderSummary;