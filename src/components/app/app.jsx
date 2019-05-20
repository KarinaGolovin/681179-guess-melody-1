import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../header/header.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessTrackScreen from '../guess-track-screen/guess-track-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   currentQuestion: -1,
    // };
  }

  render() {
    const {questions} = this.props;
    // const {currentQuestion} = this.state;

    return this._showScreen(questions[currentQuestion], () => {
      this.setState({
        currentQuestion: (currentQuestion + 1) >= questions.length ? -1 : currentQuestion + 1,
      });
    });
  }

  _showScreen(currentQuestion, onClick) {
    if (!currentQuestion) {
      const {errorCount, gameTime, onWelcomeScreenClick} = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClick={onWelcomeScreenClick}
      />;
    }

    switch (currentQuestion.type) {
      case `genre`: return (
        <section className="game game--genre">
          <Header />
          <GuessTrackScreen
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        </section>
      );

      case `artist`: return (
        <section className="game game--artist">
          <Header />
          <GuessArtistScreen
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />;
        </section>
      );
    }

    return null;
  }

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    currentQuestion: state.questionScreen,
    currentMistakes: state.mistakes,
  });

  const mapDispatchToProps = (dispatch) => ({
    onWelcomeScreenClick,
    onUserAnswer
  });
}

App.propTypes = {
  onClick: PropTypes.func,
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export {App};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
