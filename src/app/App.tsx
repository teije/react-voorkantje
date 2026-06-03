import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PokemonCards from './routes/pokemoncards'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonCards />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
