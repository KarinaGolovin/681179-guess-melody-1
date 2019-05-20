import React from 'react';
import renderer from 'react-test-renderer';
import GameMistakeSign from './game-mistake-sign.jsx';

const mock = {
  mistakeSignState: `correct`,
};

it(`GameMistakeSign correctly rendered`, () => {
  const component = renderer.create(
      <GameMistakeSign
        mistakeSignState={mock.mistakeSignState}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
