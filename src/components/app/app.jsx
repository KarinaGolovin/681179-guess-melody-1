import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }
  render() {
    const {gameTime, errorCount} = this.props;
    const {question} = this.state;

    return <WelcomeScreen
      time={gameTime}
      errorCount={errorCount}
      onClick={() => {
        this.setState({
          question: question + 1,
        });
      }}
    />;
  }
}

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  onClick: PropTypes.func,
  questions: PropTypes.array.isRequired,
};

export default App;
