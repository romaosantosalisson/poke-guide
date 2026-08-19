import React, { useState } from "react";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonsByAbility } from "../utils/pokeApi";
import "./pages.css";

export function SearchByAbility() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Suggested popular abilities
  const abilities = [
    { id: "overgrow", label: "Overgrow (Crescer)" },
    { id: "blaze", label: "Blaze (Chama)" },
    { id: "torrent", label: "Torrent (Torrente)" },
    { id: "static", label: "Static (Estática)" },
    { id: "levitate", label: "Levitate (Levitação)" },
    { id: "intimidate", label: "Intimidate (Intimidação)" },
  ];

  const handleSearch = async (abilityId: string) => {
    if (!abilityId) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchTerm("");

    try {
      const results = await getPokemonsByAbility(abilityId);
      setPokemons(results);
      if (results.length === 0) {
        setError(`Nenhum Pokémon encontrado com a habilidade "${abilityId}".`);
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao buscar os Pokémons por habilidade.");
      setPokemons([]);
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
        <h2 className="search-box-title">Buscar por Habilidade</h2>
        <p className="search-box-desc">
          Digite ou selecione uma das habilidades abaixo para ver os Pokémons que a possuem.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Ex: static, blaze, overgrow..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

        <div className="suggestions-box">
          {abilities.map((ability) => (
            <button
              key={ability.id}
              type="button"
              className="suggestion-tag"
              onClick={() => {
                setSearchTerm(ability.id);
                handleSearch(ability.id);
              }}
            >
              {ability.label}
            </button>
          ))}
        </div>
      </div>

      <div className="results-wrapper">
        {loading && (
          <Loading
            message="Buscando Pokémons..."
            subMessage={`Buscando criaturas que dominam a habilidade selecionada.`}
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
            <span className="empty-state-icon">⚡</span>
            <h3 className="empty-state-title">Selecione uma habilidade</h3>
            <p className="empty-state-desc">
              Escolha uma habilidade na lista acima ou faça uma busca personalizada para listar os Pokémons.
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
