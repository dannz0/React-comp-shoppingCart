import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [...cartItems],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = function () {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = function (id) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const increaseItem = function (id) {
    dispatch({ type: 'INCREASE_ITEM', payload: { id } });
  };

  const decreaseItem = function (id) {
    dispatch({ type: 'DECREASE_ITEM', payload: { id } });
  };

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  const fetchData = async function () {
    dispatch({ type: 'LOADING' });

    const res = await fetch(url);
    const data = await res.json();

    dispatch({ type: 'DISPLAY_ITEMS', payload: { data } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAmount = function (id, type) {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
