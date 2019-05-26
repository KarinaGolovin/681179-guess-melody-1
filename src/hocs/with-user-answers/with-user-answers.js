import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default function (Component) {
  class WithUserAnswers extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswers: {},
      };

      this._handleChange = this._handleChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleChange({name, isChecked}) {
      this.setState({
        userAnswers: {
          ...this.state.userAnswers,
          [name]: isChecked
        }
      });
    }

    _handleSubmit() {
      const {userAnswers} = this.state;
      const selectedAnswers = Object.keys(userAnswers).filter((key) => userAnswers[key]);

      this.props.onAnswer(selectedAnswers);
    }

    render() {
      return <Component
        {...this.props}
        onChange={this._handleChange}
        onSubmit={this._handleSubmit}
        userAnswers={this.state.userAnswers}
      />;
    }
  }

  WithUserAnswers.propTypes = {
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswers;
}

