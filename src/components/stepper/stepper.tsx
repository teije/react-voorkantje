import { useState } from 'react'
import './stepper.css'
import { PokemonCard } from '../pokemoncard/pokemoncard'

export function Stepper({
  initialStep: initialStep,
  enableCry,
}: {
  initialStep: number
  enableCry: boolean
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const VISIBLE_COUNT = 3
  const BUFFER = 3

  function handlePrevious() {
    setCurrentStep((s) => Math.max(initialStep, s - 1))
  }

  function handleNext() {
    setCurrentStep((s) => s + 1)
  }

  const windowSize = VISIBLE_COUNT + BUFFER
  const baseId = currentStep

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
          {Array.from({ length: windowSize }, (_, i) => (
            <div key={i} className="slide">
              <PokemonCard id={baseId + i} enableCry={enableCry} />
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
