let defaultState = {
  isDark: true,
};

let themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DARK": {
      let newState = { ...state };
      if (action.payload.isEnabled == true) {
        newState.isDark = action.payload.isEnabled;
      } else {
        newState.isDark = false;
      }

      return newState;
    }
    case "RESET": {
      return state;
    }
    default:
      return state;
  }
};

export default themeReducer;
