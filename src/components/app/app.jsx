import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {incrementQuestion, incrementMistakes, resetGame} from '../../store/actions';
import Header from '../header/header.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessTrackScreen from '../guess-track-screen/guess-track-screen.jsx';

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
    const {errorCount, gameTime, currentMistakes, validateAnswer} = this.props;

    if (!question) {
      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClick={() => {
          this._nextQuestion();
        }}
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
          <GuessTrackScreen
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
          <GuessArtistScreen
            question={question}
            onAnswer={(userAnswer) => {
              this._nextQuestion();
              validateAnswer(userAnswer, question, currentMistakes, errorCount);
            }}
          />;
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
