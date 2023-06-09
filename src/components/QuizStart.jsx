/* eslint-disable react/prop-types */
export default function QuizStart({ handleStart }) {
    return (
        <div className='container'>
            <h1>Quizzical</h1>
            <p className='quiz-description'>Test your knowledge with our interactive quiz! Click the Start quiz button below to begin.</p>
            <button 
                className='quiz-button'
                onClick={ handleStart }
            >
                Start Quiz
            </button>
      </div>
    )
}