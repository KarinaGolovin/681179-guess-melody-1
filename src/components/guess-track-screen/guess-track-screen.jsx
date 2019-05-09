import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GuessTrackScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {genre, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          const selectedAnswers = Object.keys(this.state.formData).filter((key) => {
            return this.formData[key];
          });

          onAnswer(selectedAnswers);
        }}>
          {answers.map((it, i) => {
            return (
              <div className="track" key={`answer-${i}`}>
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio src={it.trackSrc}></audio>
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} onChange={this._toggleState} />
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

  _toggleState(evt) {
    const inputName = evt.target.value;
    const checked = evt.target.checked;

    this.setState({
      formData: Object.assign({}, this.setState.formData, {
        [inputName]: checked
      })
    });
  }
}

GuessTrackScreen.propTypes = {
  question: PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      trackSrc: PropTypes.string.isRequired,
      trackGenre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    })),
  }),
  onAnswer: PropTypes.func.isRequired,
};

export default GuessTrackScreen;
