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

export function PokemonCard({
  name,
  enableCry,
  onReady,
}: {
  name: string;
  enableCry: boolean;
  onReady: () => void;
}) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [cardColor, setCardColor] = useState("#E5E5E5");

  function handlePokemonLoaded(data: PokemonData) {
    setPokemon(data);
    setCardColor(TYPE_COLORS[data.types[0]] ?? "#E5E5E5");
  }

  return (
    <div className="pokemon-card" style={{ backgroundColor: cardColor }}>
      <i className="stat-hp">HP: {pokemon?.hp}</i>
      <div className="image-frame">
        <Pokemon
          name={name}
          enableCry={enableCry}
          onLoaded={(data) => {
            handlePokemonLoaded(data);
            onReady();
          }}
        />
      </div>

      {pokemon && (
        <>
          {pokemon.typeImages.map((img, i) => (
            <img
              className="pokemon-type-img"
              key={`${pokemon.name}-${i}`}
              src={img}
              alt="type"
            />
          ))}

          <h3>
            #{pokemon.id} {pokemon.name}
          </h3>
          <i className="types">{pokemon.types.join(", ")}</i>
        </>
      )}
    </div>
  );
}