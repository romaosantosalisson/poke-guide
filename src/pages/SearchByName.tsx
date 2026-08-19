import React, { useState } from "react";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonByNameOrId } from "../utils/pokeApi";
import "./pages.css";

export function SearchByName() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const suggestions = ["Pikachu", "Charizard", "Mewtwo", "Greninja", "Eevee", "Lucario"];

  const handleSearch = async (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchTerm("");

    try {
      const result = await getPokemonByNameOrId(cleanTerm);
      setPokemon(result);
      if (!result) {
        setError(`Nenhum Pokémon encontrado com o nome ou ID "${cleanTerm}".`);
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao realizar a busca. Tente novamente.");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="search-page-container">
      <div className="search-box-card">
        <h2 className="search-box-title">Buscar por Nome</h2>
        <p className="search-box-desc">
          Digite o nome exato ou o número (ID) do Pokémon para ver seus detalhes.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Ex: pikachu, charizard, 25..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

        <div className="suggestions-box">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="suggestion-tag"
              onClick={() => {
                setSearchTerm(suggestion);
                handleSearch(suggestion);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="results-wrapper">
        {loading && (
          <Loading
            message="Buscando Pokémon..."
            subMessage={`Procurando por "${searchTerm}" nos servidores da Pokédex.`}
          />
        )}

        {!loading && error && (
          <div className="empty-state">
            <span className="empty-state-icon">⚠️</span>
            <h3 className="empty-state-title">Ops! Pokémon não encontrado</h3>
            <p className="empty-state-desc">{error}</p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="empty-state">
            <span className="empty-state-icon">🔍</span>
            <h3 className="empty-state-title">Pronto para buscar</h3>
            <p className="empty-state-desc">
              Insira o nome de um Pokémon ou clique em uma das sugestões acima para iniciar sua busca.
            </p>
          </div>
        )}

        {!loading && hasSearched && pokemon && !error && (
          <>
            <h3 className="search-results-header">Resultado da busca</h3>
            <div className="results-grid">
              <Card pokemon={pokemon} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
