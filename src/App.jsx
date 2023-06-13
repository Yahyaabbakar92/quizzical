import { useState } from 'react'
import Quiz from './components/Quiz'
import Intro from './components/Intro'
import Score from './components/Score'
import blueBlob from './assets/images/blue-blob.png'
import yellowBlob from './assets/images/yellow-blob.png'

export default function App() {
  const [gameStarted, setGameStarted] = useState(true)
  const [quizFinished, setQuizFinished] = useState(false)
  const [score, setScore] = useState(0)

  const styles = {
    background: `url(${ blueBlob }) no-repeat bottom left,
		url(${ yellowBlob }) no-repeat top right`
  }

  function startQuiz() {
    setGameStarted(true)
  }
  function finishQuiz() {
    setQuizFinished(true)

    const calculatedScore = 0
    setScore(calculatedScore)
  }
  function restartQuiz() {
    setGameStarted(false)
    setQuizFinished(false)
    setScore(0)
  }

  return (
    <div className='container' style={ styles }>
      { gameStarted && !quizFinished && (<Quiz onFinishQuiz={ finishQuiz } />) }
      { !gameStarted && !quizFinished && (<Intro onStartQuiz={ startQuiz } />) }
      { quizFinished && (<Score score={ score } onRestartQuiz={ restartQuiz } />) }
    </div>
  )
}
