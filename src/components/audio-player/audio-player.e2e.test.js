import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

describe(`Tests AudioPlayer toggle on button click`, () => {
  it(`Check if AudioPlayer state correctly changes`, () => {
    const handlePlayButtonClick = jest.fn();

    Object.defineProperty(AudioPlayer.prototype, `_audioRef`, {
      get: () => {
        return {
          current: {
            play: () => {},
            pause: () => {}
          }
        };
      },
      set: () => {}
    });

    const component = mount(<AudioPlayer
      trackSrc={`https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`}
      isPlaying={false}
      handlePlayButtonClick={handlePlayButtonClick}
    />);

    component.setState({
      isLoading: false
    });

    component.find(`.track__button`).simulate(`click`);

    expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
    expect(component.state(`isPlaying`)).toBeTruthy();
  });

  it(`Check if AudioPlayer change state correctly toggle`, () => {
    const handlePlayButtonClick = jest.fn();
    const component = mount(<AudioPlayer
      trackSrc={``}
      isPlaying={false}
      handlePlayButtonClick={handlePlayButtonClick}
    />);

    component.update();

    const playButton = component.find(`.track__button`);

    playButton.simulate(`click`);
    playButton.simulate(`click`);

    expect(component.state(`isPlaying`)).toBeFalsy();
  });
});

