import React, {PureComponent} from 'react';
import withAudio from '../../hocs/with-audio/with-audio';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
const AudioPlayerWrapped = withAudio(AudioPlayer);

export default function (Component) {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }
    render() {
      return <Component {...this.props} renderPlayer={(it, i) => {
        return <AudioPlayerWrapped
          trackSrc={it.trackSrc}
          isPlaying={i === this.state.activePlayer}
          handlePlayButtonClick={() => this.setState({
            activePlayer: this.state.activePlayer === i ? -1 : i
          })} />;
      }}/>;
    }
  }

  return WithActivePlayer;
}
