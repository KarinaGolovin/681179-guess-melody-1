import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

function AudioPlayer(props) {
  const {isLoading, isPlaying, onPlayButtonClick, renderAudio} = props;

  return (
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}>
      </button>
      <div className="track__status">
        {renderAudio()}
      </div>
    </Fragment>
  );
}

AudioPlayer.propTypes = {
  renderAudio: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
