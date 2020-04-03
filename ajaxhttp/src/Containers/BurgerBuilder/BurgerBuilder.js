import React,{ Component } from "react";
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js/axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    cheese : 0.4,
    salad:0.5,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalPrice : 4,
        purchaseable:false,
        purchasing:false,
        Loading:false,
        error:null
    }

    componentDidMount(){
        axios.get('https://react-my-burger-12538.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        })
        .catch(err=>{
            this.setState({error:err})
        })
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
        //alert('continue');
        this.setState({Loading:true})
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'aastha',
                aadress:{
                    street:'vikaspuri',
                    pincode:110018
                },
                email:'test@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({Loading:false,purchasing:false})
        })
        .catch(error=>{
            this.setState({Loading:false,purchasing:false})
        })


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
        let orderSummary = null;
        

        let burger = this.state.error? <p>ingredients can't be loaded</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary 
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}/>;
        }
        if(this.state.Loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler}
                show={this.state.purchasing}>
                  {orderSummary}  
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder,axios);