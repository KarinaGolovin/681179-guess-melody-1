import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from '../audio-player/audio-player.jsx';
import withAudio from '../../hocs/with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

it(`AudioPlayer correctly renders`, () => {
  const component = renderer.create(
      <AudioPlayerWrapped
        trackSrc=''
        isPlaying={false}
        handlePlayButtonClick={jest.fn()}
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
