// import quizData from '../quizData'
// import { useState, useEffect } from 'react'
// import { decode } from 'html-entities'
// import { nanoid } from 'nanoid'

// export default function Quiz() {
//     const [questions, setQuestions] = useState(quizData.results)

//     const questionInfo = questions.map(question => {
//         return {
//             ...question,
//             id: nanoid(),
//             answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
//             selected: null,
//             checked: false
//         }
//     })
//     const questionEl = questionInfo.map(question => (
//         <div key={ question.id }>
//             <h3>{ question.question }</h3>
//             <ul>
//                 { question.answers.map(choice => (
//                     <li key={question.id}>
//                         <label htmlFor={question.id}>
//                             <input 
//                                 type="radio" 
//                                 name={question.answers.id} 
//                                 id={question.id} 
//                             />
//                             {choice}
//                         </label>
//                     </li>
//                 )) }
//             </ul>
//         </div>
//     ))
    
//     function shuffleArray(array) {
//         const shuffledArray = [...array]
//         for (let i = shuffledArray.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
//         }
//         return shuffledArray
//     }
//     return (
//         <div className='quiz'>
//             {questionEl}
//         </div>
//     )
// }

import quizData from '../quizData';
import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function Quiz({ onFinishQuiz }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionInfo = quizData.results.map((question) => ({
      ...question,
      id: nanoid(),
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      selected: null,
      checked: false,
    }));
    setQuestions(questionInfo);
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
