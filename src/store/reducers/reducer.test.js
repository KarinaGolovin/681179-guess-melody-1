import reducer from './index';

const initialState = {
  currentQuestion: -1,
  mistakes: 0
};

it(`Expect that question counter would be incremented by 1`, () => {
  const expected = {
    currentQuestion: 0,
    mistakes: 0,
  };

  const result = reducer(initialState, {
    type: `INCREMENT_QUESTION`,
    playload: 1
  });

  expect(result).toEqual(expected);
});

it(`Expect that mistakes counter would be incremented by 1`, () => {
  const expected = {
    currentQuestion: -1,
    mistakes: 1,
  };

  const result = reducer(initialState, {
    type: `INCREMENT_MISTAKES`,
    playload: 1
  });

  expect(result).toEqual(expected);
});

it(`Expect that state will be reset`, () => {
  const result = reducer({
    currentQuestion: 100,
    mistakes: 99,
  }, {
    type: `RESET`
  });

  expect(result).toEqual(initialState);
});
