import React,{useState,useEffect ,useCallback} from "react";
import {connect,useDispatch,useSelector} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
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
export const burgerBuilder=props=>{
     const [purchasing,setPurchasing]=useState(false);


     const dispatch=useDispatch();
     const ings=useSelector(state=>{
         return  state.burgerBuilder.ingredients;
     });
     const price=useSelector(state=>{
        return state.burgerBuilder.totalPrice;
    });
    const error=useSelector(state=>{
        return state.burgerBuilder.error;
    });
    const isAuthenticated=useSelector(state=>{
        return  state.auth.token!==null;
    });
     const onIngredientAdded= (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName));
     const onIngredientRemoved=(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients=useCallback(()=>dispatch(burgerBuilderActions.initIngredients()),[]);
     const onInitPurchase=()=>dispatch(burgerBuilderActions.purchaseInit());
     const onSetAuthRedirectPath=(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
     
     
     
     useEffect(()=>{
         onInitIngredients();
     },[onInitIngredients]);
 
    const updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients).map(item=>{
          return ingredients[item];
          }).reduce((sum,el)=>{
               return sum+el;
            },0);
     return sum>0;
        }


    const purchaseHandler=()=>{
        if(isAuthenticated){
        setPurchasing(true);
        }else{
         props.history.push('/auth');
            onSetAuthRedirectPath('/checkout');
        }
    }

   const purchaseCancelHandler=()=>{
       setPurchasing(false);
    }

    const purchaseContinueHandler=()=>{
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
    onInitPurchase();
    props.history.push('/checkout');
    }
    
        const disableInfo={...ings};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=error?<p>Ingredients can't be loaded!</p>:<Spinner/>;
        if(ings){
         burger= (
        <Aux>
            <Burger ingredients={ings} />
        <BuildControls ingredientAdded={onIngredientAdded} ingredientRemoved={onIngredientRemoved} disabled={disableInfo}
         purchasable ={updatePurchaseState(ings)} price={price} ordered={purchaseHandler} isAuth={isAuthenticated}/>
         </Aux>);
         orderSummary= <OrderSummary ingredients={ings} price={price}
         purchaseCancelled={purchaseCancelHandler}
         purchaseContinue={purchaseContinueHandler}/>
        }
        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               
                {burger}
            </Aux>
        );
}

export default withErrorHandler( burgerBuilder, axios );