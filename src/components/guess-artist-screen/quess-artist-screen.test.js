import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

const mock = {
  song: {
    artist: `Test`,
    trackSrc: ``,
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
  const component = renderer.create(
      <GuessArtistScreen
        question={mock}
        onAnswer={jest.fn()}
      />,
      {
        createNodeMock: () => ({
        })
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});
