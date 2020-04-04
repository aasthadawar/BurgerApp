import React,{ Component } from "react";
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

const INGREDIENTS_PRICES={
    salad:1,
    cheese:5,
    bacon:2,
    meat:6
}
class BurgerBuilder extends Component{
        state={
            purchasing:false
        }

  componentDidMount(){
     this.props.onInitIngredients();

  }
     updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients).map(item=>{
          return ingredients[item];
          }).reduce((sum,el)=>{
               return sum+el;
            },0);
     return sum>0;
        }


    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
        this.setState({purchasing:true});
        }else{
            
            this.props.history.push('/auth');
            this.props.onSetAuthRedirectPath('/checkout');
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
    //     this.setState({loading:true});
    //     const order={
    //         ingredients:this.state.ingredients,
    //         price:this.state.totalPrice,
    //         customer:{
    //             name:'Shefali Goyal',
    //             address:{
    //                 street:'DummyDataStreet',
    //                 zipcode:'110078',
    //                 country:'India'
    //             },
    //             email:'dummy@dummy.com'
    //         },
    //         deliveryMethod:'fastest'
    //     }
    //    axios.post('/orders.json',order)
    //    .then(response=>{
    //        this.setState({loading:false,purchasing:false});
    //    })
    //    .catch(error=>{
    //        this.setState({loading:false,purchasing:false});
    //    });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
    }
    

    
    render(){
        const disableInfo={...this.props.ings};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=this.props.error?<p>Ingredients can't be loaded!</p>:<Spinner/>;
        if(this.props.ings){
         burger= (
        <Aux>
            <Burger ingredients={this.props.ings} />
        <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabled={disableInfo}
         purchasable ={this.updatePurchaseState(this.props.ings)} price={this.props.price} ordered={this.purchaseHandler} isAuth={this.props.isAuthenticated}/>
         </Aux>);
         orderSummary= <OrderSummary ingredients={this.props.ings} price={this.props.price}
         purchaseCancelled={this.purchaseCancelHandler}
         purchaseContinue={this.purchaseContinueHandler}/>
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));