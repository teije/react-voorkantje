import { cache, useEffect, useRef, useState } from 'react'
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

const requestUrlAndResponseCache: Map<string, Promise<any>> = new Map()

export function Pokemon({
  id: id,
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
      if (enableCry) loadCry(data)

      setPokemon(data)
      onLoaded(data)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, enableCry, onLoaded])

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

async function getPokemonById(id: number): Promise<PokemonData> {
  const requestUrl = `https://pokeapi.co/api/v2/pokemon/${id}`

  let request = tryGetResultFromCacheOrNull(requestUrl)

  if (!request) {
    request = fetch(requestUrl)

    requestUrlAndResponseCache.set(requestUrl, request)
  }

  const response = await request

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon ${id}`)
  }

  const data = await response.clone().json()

  const types = data.types.map((t: { type: { name: string } }) => t.type.name)

  const typeImages = await getPokemonTypeImages(types)

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types,
    cry: data.cries?.legacy ?? '',
    typeImages,
    hp: data.stats[0]?.base_stat ?? 0,
  }
}

function tryGetResultFromCacheOrNull(url: string): Promise<any> | null {
  return requestUrlAndResponseCache.get(url) ?? null
}

async function getPokemonTypeImage(typeName: string): Promise<string | null> {
  const url = `https://pokeapi.co/api/v2/type/${typeName}`

  let request = tryGetResultFromCacheOrNull(url)

  if (!request) {
    request = fetch(url)
    requestUrlAndResponseCache.set(url, request)
  }

  const response = await request

  if (!response.ok) {
    return null
  }

  const data = await response.clone().json()

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
