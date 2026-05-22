import { useState } from "react";
import "./App.css";
import { PokemonCard } from "../components/pokemoncard/pokemoncard";
import { ToggleButton } from "../components/togglebutton/togglebutton";

const TOTAL = 10;

function App() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [enableCry, setEnableCry] = useState(false);

  function handleCardReady(index: number) {
    setVisibleCount(current =>
      index === current - 1
        ? Math.min(current + 1, TOTAL)
        : current
    );
  }

  return (
    <div>
      <ToggleButton
        label="Toggle Pokémon cries on hover"
        enabled={enableCry}
        onToggleEnabled={setEnableCry}
      />
      <div className="pokemon-grid">
        {render151(visibleCount, enableCry, handleCardReady)}
      </div>
    </div>
  );
}

function render151(
  visibleCount: number,
  enableCry: boolean,
  onReady: (index: number) => void
) {
  return Array.from({ length: visibleCount }, (_, i) => (
    <div key={i + 1} className="pokemon-slot show">
      <PokemonCard
        name={(i + 1).toString()}
        enableCry={enableCry}
        onReady={() => onReady(i)}
      />
    </div>
  ));
}

export default App;
