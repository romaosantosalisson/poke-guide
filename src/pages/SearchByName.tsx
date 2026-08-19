import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonByNameOrId } from "../utils/pokeApi";
import "./pages.css";

export function SearchByName() {
  const { t } = useTranslation();
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
        <h2 className="search-box-title">{t("searchByName")}</h2>
        <p className="search-box-desc">{t("searchByNameDesc")}</p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            {t("search")}
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
            <h3 className="empty-state-title">{t("readyToSearch")}</h3>
            <p className="empty-state-desc">{t("searchByNameReady")}</p>
          </div>
        )}

        {!loading && hasSearched && pokemon && !error && (
          <>
            <h3 className="search-results-header">{t("result")}</h3>
            <div className="results-grid">
              <Card pokemon={pokemon} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
