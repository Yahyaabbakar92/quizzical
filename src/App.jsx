import QuizStart from './components/QuizStart';
import QuizQsnAns from './components/QuizQsnAns';
import { useState } from 'react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(true)

  function handleStart() {
    setHasStarted(prevStart => !prevStart)
  }
  return (
    <div>
      { hasStarted ? <QuizQsnAns /> : <QuizStart handleStart={ handleStart } /> }
    </div>
  )
}
