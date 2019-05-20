const initialState = {
  questionScreen: -1,
  mistakes: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_QUESTION`:
      return Object.assign({}, state, {
        questionScreen: state.questionScreen + action.playload,
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
