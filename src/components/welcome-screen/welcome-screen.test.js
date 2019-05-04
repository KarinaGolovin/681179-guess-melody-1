import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

describe(`Render WelcomeScreen page without crush`, () => {
  it(`WelcomeScreen correctly renders`, () => {
    const component = renderer.create(
        <WelcomeScreen
          time={0}
          errorCount={0}
          onClick={jest.fn()}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
