import { useEffect, useState } from "react";
import "./App.css";

export type Pokemon = {
  id: number;
  name: string;
  frontImage: string;
  backImage: string;
  types: string[];
};

function App() {
  return (
    <>
      <PokemonView name="ditto" />
      <PokemonView name="charmander" />
      <PokemonView name="pikachu" />
      <PokemonView name="raichu" />
      <PokemonView name="onix" />
    </>
  );
}

function PokemonView({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemonByName(name)
      .then(setPokemon)
      .catch(err => setError(err.message));
  }, [name]);

  function PokemonImage({ pokemon }: { pokemon: Pokemon }) {
    const [showBack, setShowBack] = useState(false);

    return (
      <img
        src={showBack ? pokemon.backImage : pokemon.frontImage}
        alt={pokemon.name}
        onMouseEnter={() => setShowBack(true)}
        onMouseLeave={() => setShowBack(false)}
      />
    );
  }


  if (error) {
    return <p>{error}</p>;
  }

  if (!pokemon) {
    return <p>Loading…</p>;
  }

  return (
    <div>
      <h2>
        #{pokemon.id} {pokemon.name}
      </h2>

      <div className="pokemon-image">
        <PokemonImage pokemon={pokemon} />
      </div>

      <p>Types: {pokemon.types.join(", ")}</p>
    </div>
  );
}

async function getPokemonByName(name: string): Promise<Pokemon> {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!result.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await result.json();

  return {
    id: data.id,
    name: data.name,
    frontImage: data.sprites.front_default,
    backImage: data.sprites.back_default,
    types: data.types.map((t: any) => t.type.name),
  };
}

export default App;
