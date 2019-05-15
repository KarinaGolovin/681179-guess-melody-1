import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: null,
      isLoading: true,
      isPlaying: props.isPlaying,
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
      isPlaying: true,
    });

    this._audioRef.current.onpause = () => this.setState({
      isPlaying: false,
    });

    this._audioRef.current.ontimeupdate = () => this.setState({
      progress: this._audioRef.current.currentTime
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this._audioRef.current.play();
      } else {
        this._audioRef.current.pause();
      }
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

  _togglePlayButtonClick() {
    this.props.handlePlayButtonClick();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
}

AudioPlayer.propTypes = {
  trackSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
