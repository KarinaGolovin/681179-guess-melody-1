import React from 'react';
import PropTypes from 'prop-types';

const GuessArtistScreen = (props) => {
  const {song, answers} = props;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <button className="track__button track__button--play" type="button"></button>
        <audio src={song.trackSrc}></audio>
      </div>
      <form className="game__artist">
        {answers.map((it, i) => {
          return (
            <div className="artist" key={`answer-${i}`}>
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`} />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={it.picture} alt={it.artist} />
                {it.artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

GuessArtistScreen.propTypes = {
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    trackSrc: PropTypes.string.isRequired,
  }),
  answers: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
};

export default GuessArtistScreen;
