import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withUserAnswers from './with-user-answers';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswers(MockComponent);

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

it(`Should update user answers correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped
    answers={mock.questions.answers}
    onAnswer={jest.fn()}
  />);

  expect(wrapper.props().userAnswers).toEqual({});

  wrapper.props().onChange({
    name: `answer-1`,
    isChecked: true
  });

  wrapper.props().onChange({
    name: `answer-2`,
    isChecked: false
  });

  wrapper.props().onChange({
    name: `answer-3`,
    isChecked: true
  });

  expect(wrapper.props().userAnswers).toEqual({
    'answer-1': true,
    'answer-2': false,
    'answer-3': true,
  });
});
