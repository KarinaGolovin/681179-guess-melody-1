import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this.state = {
      progress: null,
      isLoading: true,
      isPlaying,
    };

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

  componentDidMount() {
    this._audio = new Audio(this.props.trackSrc);

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
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
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
