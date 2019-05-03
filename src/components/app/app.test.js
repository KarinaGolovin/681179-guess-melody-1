import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

describe(`App test`, () => {
  it(`App correctly renders`, () => {
    const tree = renderer.create(
        <App
          gameTime={0}
          errorCount={0}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
