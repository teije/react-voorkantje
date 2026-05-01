import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice () {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdvice(data.slip.advice);
    setCount(count + 1);
  }

  useEffect(function() {
    getAdvice();
  }, [])

  return (
    <>
      <div>
        <h1>Hello, world!</h1>
        <Message count={count} />
        <button onClick={getAdvice}>Get advice</button>
        <p>{advice}</p>
      </div>
    </>
  )
}

function Message(props: { count: number }) {
  return (<p>You have requested advice {props.count} number of times.</p>);
}

export default App
