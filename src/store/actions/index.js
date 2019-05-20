const incrementQuestion = () => ({
  type: `INCREMENT_QUESTION`,
  playload: 1,
});

const incrementMistakes = (userAnswer, question, mistakes, maxMistakes) => {
  let answerIsCorrect = isCorrectAnswer(userAnswer, question);

  if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
    return {
      type: `RESET`
    };
  }

  return {
    type: `INCREMENT_MISTAKES`,
    playload: answerIsCorrect ? 0 : 1,
  };
};

const isCorrectAnswer = (userAnswer, question) => {
  switch (question.type) {
    case `genre`:
      return isCorrectGenres(userAnswer, question);
    case `artist`:
      return isCorrectArtist(userAnswer, question);
  }

  return false;
};

const isCorrectGenres = (answers, question) => {
  return answers.every((it, i) => {
    return it === (question.answer[i].genre === question.genre);
  });
};

const isCorrectArtist = (answer, question) => {
  return answer.artist === question.song.artist;
};

export default {
  incrementQuestion,
  incrementMistakes
};
