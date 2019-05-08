import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

const mock = {
  song: {
    artist: `Test`,
    trackSrc: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  },
  answers: [
    {
      artist: `Test`,
      picture: ``
    },
    {
      artist: `One`,
      picture: ``
    },
    {
      artist: `Two`,
      picture: ``
    },
    {
      artist: `Three`,
      picture: ``
    },
  ],
};

it(`GuessArtistScreen correctly rendered`, () => {
  const {song, answers} = mock;
  const component = renderer.create(<GuessArtistScreen
    song={song}
    answers={answers}
  />).toJSON();

  expect(component).toMatchSnapshot();
});
