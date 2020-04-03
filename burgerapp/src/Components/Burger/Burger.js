import React from 'react';

import styles from '../Burger/Burger.module.css';

import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const Burger =(props)=>{
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
           return <BurgerIngredients key={igKey + i} type={igKey} />
        });
    })
    .flat();
    if(transformedIngredients.length===0){
        transformedIngredients = <p>please start adding ingredients</p>
    }
    console.log(transformedIngredients);
    return(
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default Burger;