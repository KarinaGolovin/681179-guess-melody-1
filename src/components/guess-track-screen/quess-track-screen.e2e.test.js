import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessTrackScreen from './guess-track-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswers from '../../hocs/with-user-answers/with-user-answers';
const GuessTrackScreenWrapped = withUserAnswers(withActivePlayer(GuessTrackScreen));

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
      {
        trackSrc: `path`,
        trackGenre: `pop`,
      },
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
  const trackScreen = mount(<GuessTrackScreenWrapped
    onAnswer={onAnswer}
    question={question}
  />);

  const formSendPrevention = jest.fn();

  trackScreen.find(`form`).simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Check if onChange supply the right value`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const trackScreen = mount(<GuessTrackScreenWrapped
    question={question}
    onAnswer={onAnswer}
  />);

  trackScreen.find(`#answer-0`).simulate(`change`, {
    target: {
      value: `answer-0`,
      checked: true
    }
  });

  trackScreen.find(`#answer-2`).simulate(`change`, {
    target: {
      value: `answer-2`,
      checked: true
    }
  });

  trackScreen.find(`form`).simulate(`submit`);

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toBeCalledWith([`answer-0`, `answer-2`]);
});
