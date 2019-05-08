import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessTrackScreen from './guess-track-screen.jsx';

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        trackSrc: `path`,
        trackGenre: `pop`,
      },
    ]
  },
};

it(`Check if PreventDefault works correctly on GuessTrackScreen submit`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const trackQuestion = mount(<GuessTrackScreen
    onAnswer={onAnswer}
    question={question}
  />);

  const formSendPrevention = jest.fn();

  trackQuestion.find(`form`).simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
