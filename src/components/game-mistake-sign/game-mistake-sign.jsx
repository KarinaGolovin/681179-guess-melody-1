import React from 'react';
import PropTypes from 'prop-types';

const GameMistakeSign = (props) => {
  return (
    <div className={props.mistakeSignState}></div>
  );
};

GameMistakeSign.propTypes = {
  mistakeSignState: PropTypes.oneOf([`wrong`, `correct`]).isRequired,
};

export default GameMistakeSign;
