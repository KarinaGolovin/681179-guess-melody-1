import React from 'react';
import PropTypes from 'prop-types';

const GuessArtistScreen = (props) => {
  const {questions} = props;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <button className="track__button track__button--play" type="button" onClick={}></button>
        <audio src={}></audio>
      </div>
      <form className="game__artist">
        {artists.map((it, i) => {
          return (
            <div className="artist">
              <input className="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1" />
              <label className="artist__name" htmlFor="answer-1">
                <img className="artist__picture" src={photoSrc} alt={artistName} />
                {artistName}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

GuessArtistScreen.propTypes = {
  //questions:
};

export default GuessArtistScreen;
