/* eslint-disable react/prop-types */
export default function Menu({ onStartQuiz }) {
    return (
        <div className='intro'>
            <h1>Quizzical</h1>
            <p className='intro-description'>Test your knowledge with our interactive quiz! Click the Start Quiz button below to begin.</p>
            <button onClick={ onStartQuiz }>Start Quiz</button>
        </div>
    )
}