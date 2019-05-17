import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class GuessTrackScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      activePlayer: -1,
    };

    this._toggleState = this._toggleState.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {question} = this.props;
    const {genre, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={this._handleSubmit}>
          {answers.map((it, i) => {
            const isChecked = this.state.formData[`answer-${i}`] || false;

            return (
              <div className="track" key={`answer-${i}`}>
                <AudioPlayer
                  trackSrc={it.trackSrc}
                  isPlaying={i === this.state.activePlayer}
                  handlePlayButtonClick={() => this.setState({
                    activePlayer: this.state.activePlayer === i ? -1 : i
                  })} />
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" checked={isChecked} value={`answer-${i}`} id={`answer-${i}`} onChange={this._toggleState} />
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

  _handleSubmit(evt) {
    evt.preventDefault();

    const selectedAnswers = Object.keys(this.state.formData).filter((key) => {
      return this.state.formData[key];
    });

    this.props.onAnswer(selectedAnswers);
  }

  _toggleState(evt) {
    const inputName = evt.target.value;
    const checked = evt.target.checked;

    this.setState({
      formData: Object.assign({}, this.state.formData, {
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
