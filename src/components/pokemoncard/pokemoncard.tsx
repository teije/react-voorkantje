import { useState } from "react";
import { Pokemon } from "../pokemon/pokemon";
import type { PokemonData } from "../pokemon/pokemon";
import "./pokemoncard.css";

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
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [cardColor, setCardColor] = useState("#E5E5E5");

  function handlePokemonLoaded(pokemon: PokemonData) {
    setPokemon(pokemon);
    const primaryType = pokemon.types[0];
    setCardColor(TYPE_COLORS[primaryType] ?? "#E5E5E5");
  }

  return (
    <div className="pokemon-card" style={{ backgroundColor: cardColor }}>
      <div className="image-frame">
        <Pokemon name={name} onLoaded={handlePokemonLoaded} />
      </div>

      {pokemon && (
        <>
          <h3>
            #{pokemon.id} {pokemon.name}
          </h3>
          <i className="types">{pokemon.types.join(", ")}</i>
        </>
      )}
    </div>
  );
}