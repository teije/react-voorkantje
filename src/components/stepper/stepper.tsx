import { useState } from 'react'
import './stepper.css'
import { PokemonCard } from '../pokemoncard/pokemoncard'

export function Stepper({
  initialStep: initialStep,
  maxAdditonalStep: maxAdditionalStep,
  enableCry,
}: {
  initialStep: number
  maxAdditonalStep: number
  enableCry: boolean
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  function handlePrevious() {
    setCurrentStep((s) => Math.max(initialStep, s - 1))
  }

  function handleNext() {
    const maxStep = initialStep + maxAdditionalStep
    setCurrentStep((s) => Math.min(maxStep - 3, s + 1)) // minus 3 due to the 3 cards already on screen
  }

  return (
    <div className="stepper">
      <div className="viewport">
        <div
          className="track"
          style={{
            transform: `translateX(-${
              (currentStep - initialStep) * (100 / 3)
            }%)`,
          }}
        >
          {Array.from({ length: maxAdditionalStep + 3 }, (_, i) => (
            <div key={i} className="slide">
              <PokemonCard id={initialStep + i} enableCry={enableCry} />
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button onClick={handlePrevious}>{'<'}</button>
        <button onClick={handleNext}>{'>'}</button>
      </div>
    </div>
  )
}
