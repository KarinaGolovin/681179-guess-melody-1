import React from "react";
import PropTypes from 'prop-types';

const WinScreen = (props) => {
  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив {props.currentMistakes} ошибки</p>
    <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
    <button className="replay" type="button" onClick={props.restartGame}>Сыграть ещё раз</button>
  </section>;
};

WinScreen.propTypes = {
  currentMistakes: PropTypes.number,
  restartGame: PropTypes.func,
};

export default WinScreen;
