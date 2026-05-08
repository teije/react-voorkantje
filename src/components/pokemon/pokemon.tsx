import { useEffect, useRef, useState } from "react";
import "./pokemon.css";

export type PokemonData = {
  id: number;
  name: string;
  frontImage: string;
  backImage: string;
  types: string[];
  cry: string;
};

export function Pokemon({
  name,
  onLoaded,
}: {
  name: string;
  onLoaded: (pokemon: PokemonData) => void;
}) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [showBack, setShowBack] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
      onLoaded(pokemon);

      audioRef.current = new Audio(pokemon.cry);
      audioRef.current.volume = 0.6;
    });
  }, [name, onLoaded]);

  function handleMouseEnter() {
    setShowBack(true);
    audioRef.current?.play().catch(() => {});
  }

  function handleMouseLeave() {
    setShowBack(false);
  }

  if (!pokemon) {
    return <div className="pokemon">Loading Pokémon…</div>;
  }

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
  );
}

async function getPokemonByName(name: string): Promise<PokemonData> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types: data.types.map((t: any) => t.type.name),
    cry: data.cries.legacy,
  };
}
