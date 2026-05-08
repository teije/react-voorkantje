import "./App.css";
import { PokemonCard } from "../components/pokemoncard/pokemoncard";

function App() {
  return (
    <>
      <div className="pokemon-grid">
            {render151()}
      </div>
    </>
  );
}

function render151() {
  return Array.from({ length: 151 }, (_, i) => (
    <PokemonCard name={(i + 1).toString()} />
  ));
}


export default App;
