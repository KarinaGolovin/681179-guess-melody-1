import React from 'react';
import PropTypes from 'prop-types';


const GuessTracksScreen = (props) => {
  const {genre, answers} = props;
  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks">
        {answers.map((it, i) => {
          return (
            <div className="track" key={`answer-${i}`}>
              <button className="track__button track__button--play" type="button"></button>
              <div className="track__status">
                <audio src={it.trackSrc}></audio>
              </div>
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          );
        })};
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GuessTracksScreen.propTypes = {
  genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    trackSrc: PropTypes.string.isRequired,
    trackGenre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
  }))
};

export default GuessTracksScreen;
