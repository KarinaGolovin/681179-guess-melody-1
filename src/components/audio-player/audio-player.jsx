import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: null,
      isLoading: true,
      isPlayerActive: props.isPlaying,
    };

    this._togglePlayButtonClick = this._togglePlayButtonClick.bind(this);
  }

  render() {
    const {isLoading, isPlayerActive} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlayerActive ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._togglePlayButtonClick}>
        </button>
        <div className="track__status">
          <audio ref={this._audioRef} src={this.props.trackSrc} />
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    this._audioRef.current.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    this._audioRef.current.onplay = () => this.setState({
      isPlayerActive: true,
    });

    this._audioRef.current.onpause = () => this.setState({
      isPlayerActive: false,
    });

    this._audioRef.current.ontimeupdate = () => this.setState({
      progress: this._audioRef.current.currentTime
    });

    this._updateAudioPlayer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlayerActive !== prevState.isPlayerActive) {
      this._updateAudioPlayer();
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.setState({
        isPlayerActive: this.props.isPlaying
      });
    }
  }

  componentWillUnmount() {
    this._audioRef.current.oncanplaythrough = null;
    this._audioRef.current.onplay = null;
    this._audioRef.current.onpause = null;
    this._audioRef.current.ontimeupdate = null;
    this._audioRef.current.src = ``;
    this._audioRef.current = null;
  }

  _updateAudioPlayer() {
    if (this.state.isPlayerActive) {
      this._audioRef.current.play();
    } else {
      this._audioRef.current.pause();
    }
  }

  _togglePlayButtonClick() {
    this.props.handlePlayButtonClick();
    this.setState({
      isPlayerActive: true
    });
  }
}

AudioPlayer.propTypes = {
  trackSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
