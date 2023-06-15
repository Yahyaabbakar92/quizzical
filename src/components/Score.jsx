/* eslint-disable react/prop-types */
import { decode } from 'html-entities';

export default function Score({ questions, onRestartQuiz }) {
  function renderResult(question) {
    const isCorrect = question.selected === question.correct_answer;

    return (
      <div key={question.id} className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
        <h3>{decode(question.question)}</h3>
        <ul>
          {question.answers.map((choice) => (
            <li key={choice}>
              <label 
                htmlFor={choice} 
                className={`radio-label ${question.selected === choice ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              >
                <input 
                    type="radio" 
                    name={question.id} 
                    id={choice} 
                    value={choice} 
                    disabled 
                />
                <span className={isCorrect ? 'correct-answer' : ''}>{decode(choice)}</span>
              </label>
            </li>
          ))}
        </ul>
        {!isCorrect && (
        <p className='correct-answer'>
          Correct: {decode(question.correct_answer)}
        </p>
      )}
      </div>
    );
  }

  const score = questions.filter((question) => question.selected === question.correct_answer).length;

  return (
    <div className='score'>
      <div className='results'>{questions.map(renderResult)}</div>
      <div className="score-footer">
        <p className='score-text'>You scored {score}/{questions.length} correct answers</p>
        <button className='restart-button' onClick={onRestartQuiz}>Restart Quiz</button>
      </div>
    </div>
  );
}