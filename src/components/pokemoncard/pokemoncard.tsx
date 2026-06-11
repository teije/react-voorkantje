import { useState } from 'react'
import { Pokemon } from '../pokemon/pokemon'
import type { PokemonData } from '../pokemon/pokemon'
import './pokemoncard.css'

const TYPE_COLORS: Record<string, string> = {
  normal: '#dcdcdc',
  fire: '#f0ab79',
  water: '#91b2f9',
  electric: '#f6e397',
  grass: '#b3e298',
  ice: '#96D9D6',
  fighting: '#c1a375',
  poison: '#ad86ac',
  ground: '#E2BF65',
  flying: '#c3d8eb',
  psychic: '#f9b6ca',
  bug: '#a8d56c',
  rock: '#c4bba2',
  ghost: '#8f839e',
  dragon: '#cab8f9',
  dark: '#7a7a7a',
  steel: '#B7B7CE',
  fairy: '#caaaba',
}

const TYPE_VARIANTS: Record<string, number[]> = {
  fire: [1, 6],
  water: [5, 0],
  electric: [3, 1],
  grass: [2, 7],
  poison: [2, 7],
  ground: [4, 6],
  rock: [4, 6],
  psychic: [0],
}

function getVariants(id: number, types: string[]) {
  const pool = types.flatMap((t) => TYPE_VARIANTS[t] ?? [])

  return {
    base: pool[id % pool.length] ?? 0,
    overlay: types.length > 1 ? (pool[(id + 1) % pool.length] ?? null) : null,
  }
}

function getIntensity(weight: number) {
  return Math.min(weight / 500, 1)
}

function getAccent(types: string[]) {
  if (types.length === 1) return TYPE_COLORS[types[0]]
  return `linear-gradient(135deg, ${TYPE_COLORS[types[0]]}, ${TYPE_COLORS[types[1]]})`
}

function getCardBg(types: string[]) {
  return `color-mix(in srgb, ${TYPE_COLORS[types[0]]} 65%, white)`
}

export function PokemonCard({
  id,
  enableCry,
}: {
  id: number
  enableCry: boolean
}) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [base, setBase] = useState(0)
  const [overlay, setOverlay] = useState<number | null>(null)
  const [accent, setAccent] = useState('#ccc')
  const [cardBg, setCardBg] = useState('#eee')
  const [intensity, setIntensity] = useState(0.3)

  function handleLoaded(data: PokemonData) {
    setPokemon(data)

    const v = getVariants(data.id, data.types)

    setBase(v.base)
    setOverlay(v.overlay)
    setAccent(getAccent(data.types))
    setCardBg(getCardBg(data.types))
    setIntensity(getIntensity(data.weight))
  }

  return (
    <div className="pokemon-card" style={{ backgroundColor: cardBg }}>
      <strong className="stat-hp">HP: {pokemon?.hp}</strong>
      <div
        className="image-frame"
        data-type={pokemon?.types[0]}
        data-overlay={pokemon?.types[1] || undefined}
        style={{
          ['--accent' as any]: accent,
          ['--intensity' as any]: intensity,
        }}
      >
        <Pokemon id={id} enableCry={enableCry} onLoaded={handleLoaded} />
      </div>

      {pokemon && (
        <>
          <div className="types-row">
            {pokemon.typeImages.map((img, i) => (
              <img key={i} src={img} className="pokemon-type-img" />
            ))}
          </div>

          <h3>
            #{pokemon.id} {pokemon.name}
          </h3>
        </>
      )}
    </div>
  )
}
