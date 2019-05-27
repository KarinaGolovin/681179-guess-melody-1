import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessArtistScreen from './guess-artist-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
const GuessArtistScreenWrapped = withActivePlayer(GuessArtistScreen);

configure({adapter: new Adapter()});

const mock = {
  question: {
    song: {
      artist: `TestTest`,
      trackSrc: ``,
    },
    answers: [
      {
        artist: `Test`,
        picture: ``
      },
      {
        artist: `Test`,
        picture: ``
      },
      {
        artist: `Test`,
        picture: ``
      },
      {
        artist: `Test`,
        picture: ``
      },
    ],
  },
};

it(`Check if onChange supply the right value`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const artistScreen = mount(<GuessArtistScreenWrapped
    onAnswer={onAnswer}
    question={question}
  />);

  artistScreen.find(`form`).simulate(`change`, {target: {value: `answer-2`}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toBeCalledWith(`answer-2`);
});
