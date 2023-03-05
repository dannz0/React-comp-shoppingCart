const reducer = function (state, action) {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload.data, loading: false };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      cart: state.cart.filter((item) => {
        return item.id !== action.payload.id;
      }),
    };
  }

  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id)
          return {
            ...item,
            amount:
              action.payload.type === 'decrease'
                ? item.amount - 1
                : item.amount + 1,
          };

        return item;
      })
      .filter((item) => item.amount);

    return { ...state, cart: tempCart };
  }

  if (action.type === 'GET_TOTALS') {
    const { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.amount += amount;
        cartTotal.total += itemTotal;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    return { ...state, total, amount };
  }

  throw new Error(`no matching action type ${action}`);
};

export default reducer;
