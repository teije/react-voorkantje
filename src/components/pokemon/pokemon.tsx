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
  weight: number
}

const cache: Map<string, Promise<any>> = new Map()

export function Pokemon({
  id,
  enableCry,
  onLoaded,
}: {
  id: number
  enableCry: boolean
  onLoaded: (pokemon: PokemonData) => void
}) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [showBack, setShowBack] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const data = await getPokemonById(id)
      if (cancelled) return

      if (enableCry) {
        audioRef.current = new Audio(data.cry)
        audioRef.current.volume = 0.6
      }

      setPokemon(data)
      onLoaded(data)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, enableCry, onLoaded])

  function handleEnter() {
    setShowBack(true)
    if (!enableCry || !audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  function handleLeave() {
    setShowBack(false)
  }

  if (!pokemon) return null

  return (
    <div className="pokemon">
      <img
        className="pokemon-image"
        src={showBack ? pokemon.backImage : pokemon.frontImage}
        alt={pokemon.name}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      />
    </div>
  )
}

async function getPokemonById(id: number): Promise<PokemonData> {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  let req = cache.get(url)
  if (!req) {
    req = fetch(url)
    cache.set(url, req)
  }

  const res = await req
  const data = await res.clone().json()

  const types = data.types.map((t: any) => t.type.name)
  const typeImages = await Promise.all(types.map(getTypeImage))

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types,
    cry: data.cries?.legacy ?? '',
    typeImages: typeImages.filter(Boolean),
    hp: data.stats[0]?.base_stat ?? 0,
    weight: data.weight,
  }
}

async function getTypeImage(type: string) {
  const url = `https://pokeapi.co/api/v2/type/${type}`

  let req = cache.get(url)
  if (!req) {
    req = fetch(url)
    cache.set(url, req)
  }

  const res = await req
  const data = await res.clone().json()

  return (
    data.sprites?.['generation-vii']?.['lets-go-pikachu-lets-go-eevee']
      ?.symbol_icon ?? null
  )
}
