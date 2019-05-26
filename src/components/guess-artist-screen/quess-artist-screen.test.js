import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
const GuessArtistScreenWrapped = withActivePlayer(GuessArtistScreen);


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
      <GuessArtistScreenWrapped
        question={mock}
        onAnswer={jest.fn()}
      />,
      {
        createNodeMock: () => ({
          play: () => {},
          pause: () => {},
          load: () => {}
        })
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});
