import React from 'react';
import renderer from 'react-test-renderer';
import GuessTrackScreen from './guess-track-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswers from '../../hocs/with-user-answers/with-user-answers';
const GuessTrackScreenWrapped = withUserAnswers(withActivePlayer(GuessTrackScreen));;

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
  const component = renderer.create(
      <GuessTrackScreenWrapped
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
