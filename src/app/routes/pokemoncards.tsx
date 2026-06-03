import './pokemoncards.css'
import { useState } from 'react'
import { CheckboxLabeled } from '../../components/checkbox-labeled/checkbox-labeled'
import { Stepper } from '../../components/stepper/stepper'

export function PokemonCards() {
  const [enableCry, setEnableCry] = useState(false)

  return (
    <>
      <CheckboxLabeled
        label="Toggle Pokémon cries on hover"
        enabled={enableCry}
        onCheckboxEnabled={setEnableCry}
      />

      <Stepper initialStep={152} enableCry={enableCry} />
    </>
  )
}

export default PokemonCards
