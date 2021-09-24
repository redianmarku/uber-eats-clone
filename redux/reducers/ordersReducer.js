let defaultState = {
  orders: [],
};

let ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ORDERS": {
      let newState = { ...state };

      newState.orders = {
        orders: [...newState.orders, action.payload],
      };

      return newState;
    }
    case "RESET": {
      return state;
    }
    default:
      return state;
  }
};

export default ordersReducer;
