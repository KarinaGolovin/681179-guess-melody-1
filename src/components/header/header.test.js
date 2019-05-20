import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

const mock = {
  currentMistakes: 0,
  errorCount: 0
};

it(`Header correctly rendered`, () => {
  const component = renderer.create(
      <Header
        currentMistakes={mock.currentMistakes}
        errorCount={mock.errorCount}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
