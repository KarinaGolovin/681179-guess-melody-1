import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {incrementQuestion, incrementMistakes, resetGame} from '../../store/actions';
import Header from '../header/header.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessTrackScreen from '../guess-track-screen/guess-track-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswers from '../../hocs/with-user-answers/with-user-answers';

const GuessTrackScreenWrapped = withUserAnswers(withActivePlayer(GuessTrackScreen));
const GuessArtistScreenWrapped = withActivePlayer(GuessArtistScreen);

export class App extends PureComponent {
  render() {
    const {questions, currentQuestion} = this.props;

    return this._showScreen(questions[currentQuestion]);
  }

  _nextQuestion() {
    const {questions, nextQuestion, restartGame, currentQuestion} = this.props;

    if (currentQuestion === questions.length - 1) {
      restartGame();
      return;
    }

    nextQuestion();
  }

  _showScreen(question) {
    const {errorCount, gameTime, currentMistakes, validateAnswer, restartGame, currentQuestion} = this.props;

    if (!question && currentQuestion === -1) {
      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClick={() => {
          this._nextQuestion();
        }}
      />;
    }

    if (!question && currentMistakes < errorCount) {
      return <WinScreen
        currentMistakes={currentMistakes}
        restartGame={restartGame}
      />;
    }

    if (currentMistakes >= errorCount) {
      return <GameOverScreen
        restartGame={restartGame}
      />;
    }

    switch (question.type) {
      case `genre`: return (
        <section className="game game--genre">
          <Header
            currentMistakes={currentMistakes}
            errorCount={errorCount}
            gameTime={gameTime}
          />
          <GuessTrackScreenWrapped
            question={question}
            onAnswer={(userAnswer) => {
              this._nextQuestion();
              validateAnswer(userAnswer, question, currentMistakes, errorCount);
            }}
          />
        </section>
      );

      case `artist`: return (
        <section className="game game--artist">
          <Header
            currentMistakes={currentMistakes}
            errorCount={errorCount}
            gameTime={gameTime}
          />
          <GuessArtistScreenWrapped
            question={question}
            onAnswer={(userAnswer) => {
              this._nextQuestion();
              validateAnswer(userAnswer, question, currentMistakes, errorCount);
            }}
          />
        </section>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    currentQuestion: state.currentQuestion,
    currentMistakes: state.mistakes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  restartGame: () => {
    dispatch(resetGame());
  },
  nextQuestion: () => {
    dispatch(incrementQuestion());
  },
  validateAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(incrementMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

App.propTypes = {
  // from mapStateToProps
  currentQuestion: PropTypes.number,
  currentMistakes: PropTypes.number,

  // from index.js (parent component)
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object.isRequired),

  // from mapDispatchToProps
  nextQuestion: PropTypes.func,
  validateAnswer: PropTypes.func,
  restartGame: PropTypes.func
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
