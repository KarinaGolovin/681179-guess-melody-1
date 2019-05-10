import React from 'react';
import renderer from 'react-test-renderer';
import GuessTrackScreen from './guess-track-screen.jsx';

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

it(`GuessTrackScreen correctly rendered`, () => {
  const component = renderer.create(<GuessTrackScreen
    question={mock}
    onAnswer={jest.fn()}
  />).toJSON();

  expect(component).toMatchSnapshot();
});
