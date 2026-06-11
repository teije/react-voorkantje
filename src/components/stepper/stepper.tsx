import { useState } from 'react'
import './stepper.css'
import { PokemonCard } from '../pokemoncard/pokemoncard'

function getPokemonIdsInViewAndBuffer(
  startId: number,
  visibleCount: number,
  buffer: number,
): number[] {
  const total = visibleCount + buffer
  return Array.from({ length: total }, (_, i) => startId + i)
}

function getSlideWidthPercent(visibleCount: number): number {
  return 100 / visibleCount
}

function getStepTranslatePercent(visibleCount: number): number {
  return getSlideWidthPercent(visibleCount)
}

export function Stepper({
  initialStep,
  enableCry,
}: {
  initialStep: number
  enableCry: boolean
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)

  const VISIBLE_COUNT = 3
  const BUFFER = 3
  const ANIMATION_DURATION = 300
  const MIN_POKEMON_ID = 1

  function handleNext() {
    if (isAnimating) return

    setDirection('next')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentStep((s) => s + 1)
      setIsAnimating(false)
      setDirection(null)
    }, ANIMATION_DURATION)
  }

  function handlePrevious() {
    if (isAnimating) return
    if (currentStep <= MIN_POKEMON_ID) return

    setDirection('prev')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentStep((s) => Math.max(MIN_POKEMON_ID, s - 1))
      setIsAnimating(false)
      setDirection(null)
    }, ANIMATION_DURATION)
  }

  const ids = getPokemonIdsInViewAndBuffer(currentStep, VISIBLE_COUNT, BUFFER)

  const stepTranslate = getStepTranslatePercent(VISIBLE_COUNT)

  function getTransform(): string {
    if (!isAnimating || !direction) return 'translateX(0)'

    if (direction === 'next') {
      return `translateX(-${stepTranslate}%)`
    }

    if (direction === 'prev') {
      return `translateX(${stepTranslate}%)`
    }

    return 'translateX(0)'
  }

  function getTransition(): string {
    return isAnimating ? 'transform 0.3s ease' : 'none'
  }

  return (
    <div className="stepper">
      <div className="viewport">
        <div
          className="track"
          style={{
            transform: getTransform(),
            transition: getTransition(),
          }}
        >
          {ids.map((id) => (
            <div key={id} className="slide">
              <PokemonCard id={id} enableCry={enableCry} />
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
