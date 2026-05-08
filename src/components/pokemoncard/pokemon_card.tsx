import { useEffect, useState } from "react";
import "./pokemon_card.css";

export type Pokemon = {
  id: number;
  name: string;
  frontImage: string;
  backImage: string;
  types: string[];
};

const TYPE_COLORS: Record<string, string> = {
  normal: "#dcdcdc",
  fire: "#f0ab79",
  water: "#91b2f9",
  electric: "#f6e397",
  grass: "#b3e298",
  ice: "#96D9D6",
  fighting: "#c1a375",
  poison: "#ad86ac",
  ground: "#E2BF65",
  flying: "#c3d8eb",
  psychic: "#f9b6ca",
  bug: "#c0c78e",
  rock: "#c4bba2",
  ghost: "#8f839e",
  dragon: "#cab8f9",
  dark: "#a7a7a7",
  steel: "#B7B7CE",
  fairy: "#caaaba",
};

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [cardColor, setCardColor] = useState("#E5E5E5");
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    getPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
      const primaryType = pokemon.types[0];
      setCardColor(TYPE_COLORS[primaryType] ?? "#E5E5E5");
    });
  }, [name]);

  if (!pokemon) {
    return <div className="pokemon-card">Loading…</div>;
  }

  return (
    <div className="pokemon-card" style={{ backgroundColor: cardColor }}>
      <div className="image-frame">
        <img
          src={showBack ? pokemon.backImage : pokemon.frontImage}
          alt={pokemon.name}
          onMouseEnter={() => setShowBack(true)}
          onMouseLeave={() => setShowBack(false)}
        />
      </div>

      <h3>
        #{pokemon.id} {pokemon.name}
      </h3>

      <i className="types">{pokemon.types.join(", ")}</i>
    </div>
  );
}

async function getPokemonByName(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types: data.types.map((t: any) => t.type.name),
  };
}
