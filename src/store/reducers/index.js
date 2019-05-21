const initialState = {
  currentQuestion: -1,
  mistakes: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_QUESTION`:
      return Object.assign({}, state, {
        currentQuestion: state.currentQuestion + action.playload
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.playload,
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export default reducer;
