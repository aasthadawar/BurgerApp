import React from 'react';
import styles from '../BuildControls/BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls =[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
];


const BuildControls = (props) =>{
    return(
        <div className={styles.BuildControls}>
            <p><strong>Current Price : {props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl 
                disabled={props.disabled[ctrl.type]}
                key={ctrl.label} label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)} />
            ))}
            <button onClick={props.ordered}
             disabled={!props.purchaseable}
            className={styles.OrderButton}>ORDER NOW</button>
        </div>
    );
}
export default BuildControls;