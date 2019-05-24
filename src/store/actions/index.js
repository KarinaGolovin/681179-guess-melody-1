export const INCREMENT_QUESTION = `INCREMENT_QUESTION`;
export const INCREMENT_MISTAKES = `INCREMENT_MISTAKES`;

export const incrementQuestion = () => {
  return {
    type: INCREMENT_QUESTION,
    payload: 1
  };
};

export const resetGame = () => {
  return {
    type: `RESET`
  };
};

export const incrementMistakes = (userAnswer, question, mistakes, maxMistakes) => {
  const answerIsCorrect = isCorrectAnswer(userAnswer, question);

  if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
    return resetGame();
  }

  return {
    type: INCREMENT_MISTAKES,
    payload: answerIsCorrect ? 0 : 1,
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
    return it === (question.answers[i].genre === question.genre);
  });
};

const isCorrectArtist = (answer, question) => {
  return answer.artist === question.song.artist;
};

