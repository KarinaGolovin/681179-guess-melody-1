import React from 'react';
import PropTypes from 'prop-types';

function GuessTrackScreen(props) {
  const {question} = props;
  const {genre, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        props.onSubmit();
      }}>
        {answers.map((it, i) => {
          const isChecked = props.userAnswers[`answer-${i}`] || false;

          return (
            <div className="track" key={`answer-${i}`}>
              {
                props.renderPlayer(it, i)
              }
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" checked={isChecked}
                  value={`answer-${i}`} id={`answer-${i}`} onChange={(evt) => {
                    props.onChange({
                      name: evt.target.value,
                      isChecked: evt.target.checked
                    });
                  }}/>
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          );
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
}

GuessTrackScreen.propTypes = {
  question: PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      trackSrc: PropTypes.string.isRequired,
      trackGenre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    })),
  }),
  userAnswers: PropTypes.object,
  renderPlayer: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default GuessTrackScreen;
