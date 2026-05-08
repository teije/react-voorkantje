import "./App.css";
import { PokemonCard } from "../components/pokemoncard/pokemoncard";

function App() {
  return (
    <>
      <div className="pokemon-grid">
        <PokemonCard name="ditto" />
        <PokemonCard name="charmander" />
        <PokemonCard name="pikachu" />
        <PokemonCard name="raichu" />
        <PokemonCard name="onix" />
      </div>
    </>
  );
}

export default App;
