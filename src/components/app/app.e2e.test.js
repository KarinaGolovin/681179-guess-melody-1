import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app.jsx';

configure({adapter: new Adapter()});

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
    {
      type: `artist`,
      song: {
        artist: `Test`,
        trackSrc: ``,
      },
      answers: [
        {
          artist: `Test`,
          picture: ``
        },
      ],
    },
  ],
};

it(`Click on WelcomeScreen button switches to the first question page`, () => {
  const {questions} = mock;
  const app = mount(<App
    gameTime={0}
    errorCount={3}
    questions={questions}
    currentQuestion={-1}
    currentMistakes={0}
    nextQuestion={() => {
      app.setProps({currentQuestion: 0});
    }}
    validateAnswer={() => { }}
    restartGame={() => { }}
  />);

  const button = app.find(`button`);
  button.simulate(`click`);
  app.update();

  const title = app.find(`.game__title`);

  expect(title).toHaveLength(1);
  expect(title.text().indexOf(`rock`)).toBeGreaterThanOrEqual(0);
});
