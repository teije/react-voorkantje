import { useState } from 'react';
import './App.css'


// Component aanmaken die een object (van een specifieke type met properties) ontvangt
function Greeting({name, age}: GreetingProps) {
  return ( 
      <div>
        <h1>Hello, world!</h1>
        <p>{name} is {age} jaren oud!</p>
      </div>
    );
}

function ToDoList({owner}: ToDoListProps) {
  const todos = [
    "Leer React",
    "Maak een app",
    "Word een pro"
  ];

  return (
    <div>
      <h1>To-do's van {owner}</h1>
      <ul>
        {
          // Array van todos mappen naar een lijst van <li> elementen
          todos.map((todo, index) => <li key={index}>{todo}</li>)
        }
      </ul>
    </div>
  )
}



function App() {
  // State aanmaken om bij te houden of de greeting getoond moet worden
  const [showGreeting, setShowGreeting] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // Functie om de greeting te toggelen en de inputvelden leeg te maken
  function clearFields() {
    setShowGreeting(!showGreeting);
    setName("");
    setAge(0);
  }

  // Functie om de naam bij te werken op basis van de input
  function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  // Functie om de leeftijd bij te werken op basis van de input
  function handleAgeInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setAge(Number(event.target.value));
  }

  return (
    <>
    <input
      type="text"
      placeholder="Type hier een naam..."
      value={name}
      onChange={handleNameInputChange}
    />

    <input
      type="number"
      placeholder="Type hier een leeftijd..."
      value={age === 0 ? "" : age}
      onChange={handleAgeInputChange}
    />

    {/* Button met callback om greeting te toggelen */}
    <button onClick={clearFields}> Maak velden leeg </button>
    
    {/* Conditional rendering: alleen tonen als showGreeting true is */}
    {
      (name && age !== 0) 
        ? <Greeting name={name} age={age}/> 
        : "Vul een naam en leeftijd in!"
    }
    {
      (name && age !== 0) && <ToDoList owner={name} />
    }
    </>
  )
}

// Type aanmaken met properties
type GreetingProps = {
  name: string
  age: number
}

type ToDoListProps = {
  owner: string
}

export default App
