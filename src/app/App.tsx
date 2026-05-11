import { useState } from "react";
import "./App.css";
import { PokemonCard } from "../components/pokemoncard/pokemoncard";

const TOTAL = 151;

function App() {
  const [visibleCount, setVisibleCount] = useState(1);

  function handleCardReady(index: number) {
    setVisibleCount(current =>
      index === current - 1
        ? Math.min(current + 1, TOTAL)
        : current
    );
  }

  return (
    <div className="pokemon-grid">
      {render151(visibleCount, handleCardReady)}
    </div>
  );
}

function render151(
  visibleCount: number,
  onReady: (index: number) => void
) {
  return Array.from({ length: visibleCount }, (_, i) => (
    <div key={i + 1} className="pokemon-slot show">
      <PokemonCard
        name={(i + 1).toString()}
        onReady={() => onReady(i)}
      />
    </div>
  ));
}

export default App;
