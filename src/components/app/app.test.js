import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          trackSrc: `path`,
          trackGenre: `pop`,
        },
        {
          trackSrc: `path`,
          trackGenre: `jazz`,
        },
        {
          trackSrc: `path`,
          trackGenre: `rock`,
        },
        {
          trackSrc: `path`,
          trackGenre: `jazz`,
        },
      ]
    },
  ],
};

describe(`Render App page without crush`, () => {
  it(`App correctly renders`, () => {
    const {questions} = mock;
    const component = renderer.create(
        <App
          gameTime={0}
          errorCount={0}
          questions={questions}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
