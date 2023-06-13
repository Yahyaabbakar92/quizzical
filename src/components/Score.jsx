export default function Score({ score, onRestartQuiz }) {
    return (
        <div>
            <h3>Score: {score} / 5</h3>
            <button onClick={ onRestartQuiz }>Check Answers</button>
        </div>
    )
}