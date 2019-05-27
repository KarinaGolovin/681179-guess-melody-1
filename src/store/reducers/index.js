import {INCREMENT_QUESTION, INCREMENT_MISTAKES} from '../actions';

const initialState = {
  currentQuestion: -1,
  mistakes: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + action.payload
      };
    case INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload
      };
    case `RESET`:
      return {
        ...initialState
      };
  }

  return state;
};

export default reducer;
