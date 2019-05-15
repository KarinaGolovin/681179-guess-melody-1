import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);
    const {trackSrc, isPlaying} = props;

    this._audio = new Audio(trackSrc);
    this.state = {
      progress: this._audio.currentTime,
      isLoading: true,
      isPlaying,
    };

    this._audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    this._audio.onplay = () => this.setState({
      isPlaying: true,
    });

    this._audio.onpause = () => this.setState({
      isPlaying: false,
    });

    this._audio.ontimeupdate = () => this.setState({
      progress: this._audio.currentTime
    });

    this._togglePlayButtonClick = this._togglePlayButtonClick.bind(this);
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._togglePlayButtonClick}>
        </button>
        <div className="track__status">
          <audio/>
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  _togglePlayButtonClick() {
    this.props.handlePlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }
}

AudioPlayer.propTypes = {
  trackSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
