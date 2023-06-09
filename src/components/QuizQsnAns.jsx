import quiz from '../mockQsns'

export default function QuizQsnAns () {   
    const questions = quiz.results.map(({ question, correct_answer, incorrect_answers }, i) => (
        <div 
            key={ i }
            className='quiz-questions-answers'
        >
            <p className='quiz-question'>{ question }</p>
            <p className='quiz-answers'>{ correct_answer } { incorrect_answers.map(answers => answers) }</p>
        </div>
    ))
    
    return (
        <div className='quiz'>
            { questions }
        </div>
    )
}