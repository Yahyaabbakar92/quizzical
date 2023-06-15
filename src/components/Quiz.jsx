/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function Quiz({ onFinishQuiz, setQuestions }) {
  const [questions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Fetching questions from an API
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(response => response.json())
      .then(data => {
        // Manipulating and shuffling question data
        const questionInfo = data.results.map((question) => ({
          // Spread the properties of the original question object
          ...question,
          // Generate a unique ID for each question using nanoid
          id: nanoid(),
          // Shuffle the answer choices by combining incorrect and correct answers and calling the shuffleArray function
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          // Set the initial selected answer to null
          selected: null,
          // Set the initial checked state to false
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
      {/* Displaying the question */}
      <h3>{decode(question.question)}</h3>
      <ul>
        {/* Displaying the answer choices */}
        {question.answers.map((choice) => (
          <li key={choice}>
            <label htmlFor={choice} className='radio-label'>
              {/* Handling the selection of an answer */}
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
    // Shuffling an array using the Fisher-Yates algorithm
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function handleSelectAnswer(questionId, selectedAnswer) {
    // Updating the selected answer for a question
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
