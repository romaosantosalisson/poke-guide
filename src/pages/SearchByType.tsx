import React, { useState } from "react";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonsByType } from "../utils/pokeApi";
import { EmojisType } from "../types/emojis.types";
import "./pages.css";

export function SearchByType() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Available types in the EmojisType map
  const pokemonTypes = [
    { id: "fire", label: "Fogo" },
    { id: "water", label: "Água" },
    { id: "grass", label: "Grama" },
    { id: "electric", label: "Elétrico" },
    { id: "ice", label: "Gelo" },
    { id: "fighting", label: "Lutador" },
    { id: "poison", label: "Veneno" },
    { id: "ground", label: "Terra" },
    { id: "flying", label: "Voador" },
    { id: "psychic", label: "Psíquico" },
    { id: "bug", label: "Inseto" },
    { id: "rock", label: "Pedra" },
    { id: "ghost", label: "Fantasma" },
    { id: "dragon", label: "Dragão" },
    { id: "dark", label: "Sombrio" },
    { id: "steel", label: "Aço" },
    { id: "fairy", label: "Fada" },
    { id: "normal", label: "Normal" },
  ];

  const handleSearch = async (typeId: string) => {
    if (!typeId) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchTerm("");

    try {
      const results = await getPokemonsByType(typeId);
      setPokemons(results);
      if (results.length === 0) {
        setError(`Nenhum Pokémon encontrado para o tipo "${typeId}".`);
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao buscar os Pokémons por tipo.");
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Try to find the closest english ID or search what the user typed
    const cleanTerm = searchTerm.toLowerCase().trim();
    const matchedType = pokemonTypes.find(
      (t) => t.id === cleanTerm || t.label.toLowerCase() === cleanTerm
    );
    const searchId = matchedType ? matchedType.id : cleanTerm;
    handleSearch(searchId);
  };

  return (
    <div className="search-page-container">
      <div className="search-box-card">
        <h2 className="search-box-title">Buscar por Tipo</h2>
        <p className="search-box-desc">
          Selecione um dos tipos abaixo ou digite o nome do tipo para ver os Pokémons correspondentes.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Ex: fogo, water, grass, elétrico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

        <div className="suggestions-box">
          {pokemonTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              className="suggestion-tag"
              onClick={() => {
                setSearchTerm(type.label);
                handleSearch(type.id);
              }}
            >
              <span style={{ marginRight: "0.4rem" }}>{EmojisType[type.id] || "⭐"}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="results-wrapper">
        {loading && (
          <Loading
            message="Buscando Pokémons..."
            subMessage={`Carregando as criaturas associadas ao tipo selecionado.`}
          />
        )}

        {!loading && error && (
          <div className="empty-state">
            <span className="empty-state-icon">⚠️</span>
            <h3 className="empty-state-title">Sem resultados</h3>
            <p className="empty-state-desc">{error}</p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="empty-state">
            <span className="empty-state-icon">🧬</span>
            <h3 className="empty-state-title">Selecione um tipo</h3>
            <p className="empty-state-desc">
              Escolha um dos tipos elementares acima ou digite no campo para ver a lista de Pokémons daquele elemento.
            </p>
          </div>
        )}

        {!loading && hasSearched && pokemons.length > 0 && !error && (
          <>
            <h3 className="search-results-header">
              Pokémons Encontrados ({pokemons.length})
            </h3>
            <div className="results-grid">
              {pokemons.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
