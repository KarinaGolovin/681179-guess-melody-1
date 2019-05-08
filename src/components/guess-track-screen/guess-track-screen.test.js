import React from 'react';
import renderer from 'react-test-renderer';
import GuessTracksScreen from './guess-tracks-screen.jsx';

const mock = {
  genre: `rock`,
  answers: [
    {
      trackSrc: ``,
      trackGenre: `rock`,
    },
    {
      trackSrc: ``,
      trackGenre: `jazz`,
    },
    {
      trackSrc: ``,
      trackGenre: `pop`,
    },
    {
      trackSrc: ``,
      trackGenre: `jazz`,
    },
  ]
};

it(`GuessTracksScreen correctly rendered`, () => {
  const {genre, answers} = mock;
  const component = renderer.create(<GuessTracksScreen
    genre={genre}
    answers={answers}
  />).toJSON();

  expect(component).toMatchSnapshot();
});
