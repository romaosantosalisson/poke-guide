import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonsByType } from "../utils/pokeApi";
import { EmojisType } from "../types/emojis.types";
import "./pages.css";

export function SearchByType() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const pokemonTypes = [
    { id: "fire", label: t("types.fire") },
    { id: "water", label: t("types.water") },
    { id: "grass", label: t("types.grass") },
    { id: "electric", label: t("types.electric") },
    { id: "ice", label: t("types.ice") },
    { id: "fighting", label: t("types.fighting") },
    { id: "poison", label: t("types.poison") },
    { id: "ground", label: t("types.ground") },
    { id: "flying", label: t("types.flying") },
    { id: "psychic", label: t("types.psychic") },
    { id: "bug", label: t("types.bug") },
    { id: "rock", label: t("types.rock") },
    { id: "ghost", label: t("types.ghost") },
    { id: "dragon", label: t("types.dragon") },
    { id: "dark", label: t("types.dark") },
    { id: "steel", label: t("types.steel") },
    { id: "fairy", label: t("types.fairy") },
    { id: "normal", label: t("types.normal") },
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
      (t) => t.id === cleanTerm || t.label.toLowerCase() === cleanTerm,
    );
    const searchId = matchedType ? matchedType.id : cleanTerm;
    handleSearch(searchId);
  };

  return (
    <div className="search-page-container">
      <div className="search-box-card">
        <h2 className="search-box-title">{t("searchByType")}</h2>
        <p className="search-box-desc">{t("searchByTypeDesc")}</p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder={t("searchByTypePlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            {t("search")}
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
            <h3 className="empty-state-title">{t("selectType")}</h3>
            <p className="empty-state-desc">{t("searchByTypeReady")}</p>
          </div>
        )}

        {!loading && hasSearched && pokemons.length > 0 && !error && (
          <>
            <h3 className="search-results-header">
              {t("found")} ({pokemons.length})
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
