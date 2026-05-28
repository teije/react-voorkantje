import { useState } from 'react'
import './App.css'
import { CheckboxLabeled } from '../components/checkbox-labeled/checkbox-labeled'
import { Stepper } from '../components/stepper/stepper'

function App() {
  const [enableCry, setEnableCry] = useState(false)

  return (
    <>
      <CheckboxLabeled
        label="Toggle Pokémon cries on hover"
        enabled={enableCry}
        onCheckboxEnabled={setEnableCry}
      />

      <Stepper initialStep={152} maxAdditonalStep={100} enableCry={enableCry} />
    </>
  )
}

export default App
