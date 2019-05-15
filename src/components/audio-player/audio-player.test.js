import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from '../audio-player/audio-player.jsx';

it(`AudioPlayer correctly renders`, () => {
  const component = renderer.create(
      <AudioPlayer
        trackSrc=''
        isPlaying={false}
        handlePlayButtonClick={jest.fn()}
      />
  ).toJSON();
  expect(component).toMatchSnapshot();
});
