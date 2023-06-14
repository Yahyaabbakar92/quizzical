/* eslint-disable react/prop-types */
import { useState } from 'react'
import { decode } from 'html-entities'

export default function Score({ questions, onRestartQuiz }) {
    const [showResults, setShowResults] = useState(false)

    function checkAnswers() {
        setShowResults(true)
    }

    function renderResult(question) {
        const isCorrect = question.selected === question.correct_answer

        return (
            <div key={question.id} className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
                <h3>{decode(question.question)}</h3>
                <ul>
                    {question.answers.map((choice) => (
                        <li key={choice}>
                            <label htmlFor={choice} className='radio-label'>
                                <input type="radio" name={question.id} id={choice} value={choice} disabled />
                                <span>{decode(choice)}</span>
                            </label>
                        </li>
                    ))}
                </ul>
                {isCorrect ? <p className='correct-answer'>Correct: {decode(question.correct_answer)}</p> : null }
            </div>
        )
    }
    return (
        <div className='score'>
            <h1>Quiz Score</h1>
            <div className='results'>
                {showResults ? questions.map(renderResult) : null}
            </div>
            <button onClick={checkAnswers}>Check Answers</button>
            <p>Number of Correct Answers: {questions.filter(question => question.selected === question.correct_answer).length}</p>
            <button onClick={onRestartQuiz}>Restart Quiz</button>
        </div>
    )
}