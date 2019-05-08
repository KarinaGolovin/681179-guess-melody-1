import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessTrackScreen from '../guess-track-screen/guess-track-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: -1,
    };
  }

  render() {
    const {questions} = this.props;
    const {currentQuestion} = this.state;

    return this._showScreen(questions[currentQuestion], () => {
      this.setState({
        currentQuestion: currentQuestion + 1 >= currentQuestion.length ? -1 : currentQuestion + 1,
      });
    });
  }

  _showScreen(currentQuestion, onClick) {
    if (!currentQuestion) {
      const {errorCount, gameTime} = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClick={onClick}
      />;
    }

    switch (currentQuestion.type) {
      case `genre`: return (
        <section className="game game--genre">
          <Header />
          <GuessTrackScreen
            question={currentQuestion}
            onAnswer={onClick}
          />
        </section>
      );

      case `artist`: return (
        <section className="game game--artist">
          <Header />
          <GuessArtistScreen
            question={currentQuestion}
            onAnswer={onClick}
          />;
        </section>
      );
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
