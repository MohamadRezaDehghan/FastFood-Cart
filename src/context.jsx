import { createContext, useContext, useEffect, useReducer } from "react";
import cartItems from './data.js'
import reducer from "./reducer.js";


const cartContext= createContext();

 const initialState = {
    loading:false,
    cart: cartItems,
    total: 0,
    amount:0
 }

 const CartProvider= ({children})=>{
    const [state, dispatch]= useReducer(reducer , initialState)

    const clearCart = ()=>{
        dispatch({type: 'CLEAR_CART'});
    }
    const remove = id =>{
        dispatch({type: 'REMOVE' , payload: id})
    }

    const changeQuantity = changeObj =>{
        dispatch({type: 'CHANGE_QUANTITY' , payload : changeObj})
    }

    useEffect(()=>{
       dispatch({type: 'GET_TOTALS'})
    },[state.cart]);

    return(

    <cartContext.Provider value={{...state , clearCart , remove , changeQuantity}}>
        {children}
    </cartContext.Provider>
)
 }

 const useCartContext = ()=>{
    return useContext(cartContext)
 }

 export {CartProvider ,useCartContext}