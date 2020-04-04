import React,{Component} from 'react';
import Button from '../../UI/Button/Button';
 import Aux from '../../../hoc/Auxs/Auxs';
class Ordersummary extends Component{
    
    render(){
        const ingredientsummary=Object.keys(this.props.ingredients).map(item=>{
            return <li key={item}><span style={{textTransform:'capitalize'}}>{item}</span>:{this.props.ingredients[item]}</li>
            })
        return((<Aux>
            <h3>Your Order</h3>
            <p>The contents of your order are:</p>
            <ul>
                {ingredientsummary}
            </ul>
            <p><strong>Total price:{this.props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
    
        </Aux>)
    );
    }
}


export default Ordersummary;