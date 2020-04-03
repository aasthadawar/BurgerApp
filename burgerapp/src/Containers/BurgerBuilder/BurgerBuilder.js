import React,{ Component } from "react";
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    cheese : 0.4,
    salad:0.5,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{

    state={
        ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0,
        },
        totalPrice : 4,
        purchaseable:false,
        purchasing:false,
    }

    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
      this.setState({purchaseable: sum>0});  
    }

    purchaseHandler=()=>{
        this.setState({...this.state,purchasing:true});
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({...this.state,totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)

    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({...this.state,totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)

    }

    purchaseContinueHandler =()=>{
        alert('continue');
    }

    purchaseCancelHandler = ()=>{
        this.setState({...this.state,purchasing:false});
    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return(
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler}
                show={this.state.purchasing}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ordered={this.purchaseHandler}
                purchaseable={this.state.purchaseable}
                price={this.state.totalPrice}
                disabled={disabledInfo}
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={
                    this.removeIngredientHandler
                } />
            </Aux>
        );
    }
}

export default BurgerBuilder;