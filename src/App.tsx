// import { useState } from "react";
import { Card } from "./components/card";
import { Header } from "./components/header/index";
// import type { PokemonType } from "./types";

export function App() {
  // const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  return (
    <>
      <Header />
      <main>
        <h2>Lista de Pokémon's</h2>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
    </>
  );
}
