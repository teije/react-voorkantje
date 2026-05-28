import { useState } from 'react'
import './stepper.css'
import { PokemonCard } from '../pokemoncard/pokemoncard'

export function Stepper({ enableCry }: { enableCry: boolean }) {
  const INITIAL_STEP = 1
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP)

  function handlePrevious() {
    console.log(currentStep)
    if (currentStep > INITIAL_STEP) {
      setCurrentStep(currentStep - 1)
    }
  }
  function handleNext() {
    console.log(currentStep)
    setCurrentStep(currentStep + 1)
  }

  return (
    <>
      <div className="stepper">
        <div className="steps">
          <div className="step">
            <PokemonCard id={currentStep} enableCry={enableCry} />
          </div>
          <div className="step">
            <PokemonCard id={currentStep + 1} enableCry={enableCry} />
          </div>
          <div className="step">
            <PokemonCard id={currentStep + 2} enableCry={enableCry} />
          </div>
        </div>

        <div className="buttons">
          <button onClick={handlePrevious}>{'<'}</button>
          <button onClick={handleNext}>{'>'}</button>
        </div>
      </div>
    </>
  )
}
