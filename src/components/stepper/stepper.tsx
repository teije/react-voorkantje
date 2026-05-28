import { useState } from 'react'
import './stepper.css'
import { PokemonCard } from '../pokemoncard/pokemoncard'

export function Stepper({ enableCry }: { enableCry: boolean }) {
  const [currentStep, setCurrentStep] = useState(0)

  function handlePrevious() {
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  function handleNext() {
    setCurrentStep((s) => Math.min(148, s + 1))
  }

  return (
    <div className="stepper">
      <div className="viewport">
        <div
          className="track"
          style={{
            transform: `translateX(-${currentStep * (100 / 3)}%)`,
          }}
        >
          {Array.from({ length: 151 }, (_, i) => (
            <div key={i} className="slide">
              <PokemonCard id={i + 1} enableCry={enableCry} />
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