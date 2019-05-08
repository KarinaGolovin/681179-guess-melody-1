import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessTracksScreen from '../guess-track-screen/guess-track-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return <section>
      {this._showScreen(questions[question], () => {
        this.setState({
          question: question + 1 >= questions.length ? -1 : question + 1,
        });
      })}
    </section>;
  }

  _showScreen(question, onClick) {
    if (!question) {
      const {errorCount, gameTime} = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClick={onClick}
      />;
    }

    switch (question.type) {
      case `genre`: return <GuessTracksScreen
        question={question}
        onAnswer={onClick}
      />;

      case `artist`: return <GuessArtistScreen
        question={question}
        onAnswer={onClick}
      />;
    }

    return null;
  }
}

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  questions: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default App;
