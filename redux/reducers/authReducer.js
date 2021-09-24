let defaultState = {
  user: null,
};

let authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      let newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    case "LOGOUT_USER": {
      let newState = { ...state };
      newState.user = null;
      return newState;
    }

    default:
      return state;
  }
};

export default authReducer;
