import { useEffect, useRef, useState } from 'react'
import './pokemon.css'

export type PokemonData = {
  id: number
  name: string
  frontImage: string
  backImage: string
  types: string[]
  cry: string
  typeImages: string[]
  hp: number
}

export function Pokemon({
  name,
  enableCry,
  onLoaded,
}: {
  name: string
  enableCry: boolean
  onLoaded: (pokemon: PokemonData) => void
}) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [showBack, setShowBack] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const data = await getPokemonByName(name)
      if (cancelled) return
      if (enableCry) loadCry(data)

      setPokemon(data)
      onLoaded(data)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [name, onLoaded, enableCry])

  function loadCry(data: PokemonData) {
    audioRef.current = new Audio(data.cry)
    audioRef.current.volume = 0.6
  }

  function handleMouseEnter() {
    setShowBack(true)

    if (!enableCry || !audioRef.current) return

    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  function handleMouseLeave() {
    setShowBack(false)
  }

  if (!pokemon) return null

  return (
    <div className="pokemon">
      <img
        className="pokemon-image"
        src={showBack ? pokemon.backImage : pokemon.frontImage}
        alt={pokemon.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}

async function getPokemonByName(name: string): Promise<PokemonData> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await res.json()

  const types = data.types.map((t: { type: { name: string } }) => t.type.name)

  const typeImages = await getPokemonTypeImages(types)
  const STATS_HP_INDEX = 0

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types,
    cry: data.cries.legacy,
    typeImages,
    hp: data.stats[STATS_HP_INDEX].base_stat,
  }
}

async function getPokemonTypeImage(typeName: string): Promise<string | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
  const data = await res.json()

  return (
    data.sprites?.['generation-vii']?.['lets-go-pikachu-lets-go-eevee']
      ?.symbol_icon ?? null
  )
}
async function getPokemonTypeImages(types: string[]): Promise<string[]> {
  const images = await Promise.all(
    types.map((type) => getPokemonTypeImage(type)),
  )

  return images.filter((img): img is string => Boolean(img))
}
