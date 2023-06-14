/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function Quiz({ onFinishQuiz, setQuestions }) {
  const [questions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
      .then(data => {
        const questionInfo = data.results.map((question) => ({
          ...question,
          id: nanoid(),
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          selected: null,
          checked: false,
        }))
        setShuffledQuestions(questionInfo)
        setQuestions(questionInfo)
      })
      .catch(error => {
        console.error('Error fetching questions:', error)
      })
  }, []);

  const questionEl = questions.map((question) => (
    <div key={question.id}>
      <h3>{decode(question.question)}</h3>
      <ul>
        {question.answers.map((choice) => (
          <li key={choice}>
            <label htmlFor={choice} className='radio-label'>
              <input
                type="radio"
                name={question.id}
                id={choice}
                value={choice}
                onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
              />
              <span>{decode(choice)}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  ));

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function handleSelectAnswer(questionId, selectedAnswer) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, selected: selectedAnswer } : question
      )
    );
  }

  return (
    <div className='quiz'>
        {questionEl}
        <button onClick={ onFinishQuiz }>Check Answers</button>
    </div>
  )
}
