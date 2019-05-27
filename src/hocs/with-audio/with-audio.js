import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default function (Component) {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._togglePlayButtonClick = this._togglePlayButtonClick.bind(this);
      this._renderAudio = this._renderAudio.bind(this);
    }
    componentWillUnmount() {
      this._audioRef.current.oncanplaythrough = null;
      this._audioRef.current.onplay = null;
      this._audioRef.current.onpause = null;
      this._audioRef.current.src = ``;
      this._audioRef.current = null;
    }
    componentDidMount() {
      this._audioRef.current.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      this._audioRef.current.onplay = () => this.setState({
        isPlaying: true,
      });

      this._audioRef.current.onpause = () => this.setState({
        isPlaying: false,
      });

      this._updateAudioPlayer();
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    _togglePlayButtonClick() {
      this.props.handlePlayButtonClick();
      this.setState({
        isPlaying: true
      });
    }
    _updateAudioPlayer() {
      if (this.state.isPlaying) {
        this._audioRef.current.play();
      } else {
        this._audioRef.current.pause();
      }
    }
    _renderAudio() {
      return <audio ref={this._audioRef} src={this.props.trackSrc} />;
    }
    render() {
      return <Component
        {...this.props}
        isLoading={this.state.isLoading}
        isPlaying={this.state.isPlaying}
        renderAudio={this._renderAudio}
        onPlayButtonClick={this._togglePlayButtonClick}
      />;
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    trackSrc: PropTypes.string.isRequired,
    handlePlayButtonClick: PropTypes.func.isRequired,
  };

  return WithAudio;
}

