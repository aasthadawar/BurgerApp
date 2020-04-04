import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENTS_PRICES={
    salad:1,
    cheese:5,
    bacon:2,
    meat:6
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error:false,
  building:false
};

const addIngredient=(state,action)=>{
  const updatedIngredient={ [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
  const updatedIngredients=updateObject(state.ingredients,updatedIngredient)
  const updatedState={
    ingredients:updatedIngredients,
    totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building:true
  };
  return updateObject(state,updatedState);
}

const removeIngredient=(state,action)=>{
  const updatedIng={ [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
  const updatedIngs=updateObject(state.ingredients,updatedIng)
  const updatedSt={
    ingredients:updatedIngs,
    totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building:true
  };
  return updateObject(state,updatedSt);
};

const setIngredient=(state,action)=>{
  return updateObject(state,{
    ingredients:{
      salad:action.ingredients.salad,
      cheese:action.ingredients.cheese,
      meat:action.ingredients.meat,
      bacon:action.ingredients.bacon
    },
    totalPrice:0,
    error:false,
    building:false
  });
}

const fetchIngredientsFailed=(state,action)=>{
  return updateObject(state,{error:true})
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:return addIngredient(state,action);
    case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action);
      case actionTypes.SET_INGREDIENTS:return setIngredient(state,action); 
        case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action);
    default:return state;
  }
};

export default reducer;
