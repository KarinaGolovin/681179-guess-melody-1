import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

describe(`Render App page without crush`, () => {
  it(`App correctly renders`, () => {
    const component = renderer.create(
        <App
          gameTime={0}
          errorCount={0}
          onClick={jest.fn()}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
