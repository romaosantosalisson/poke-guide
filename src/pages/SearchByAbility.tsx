import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import type { PokemonType } from "../types";
import { getPokemonsByAbility } from "../utils/pokeApi";
import "./pages.css";

export function SearchByAbility() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Suggested popular abilities
  const abilities = [
    { id: "overgrow", label: t("abilities.overgrow", { defaultValue: "Supercrescimento" }) },
    { id: "blaze", label: t("abilities.blaze", { defaultValue: "Chama" }) },
    { id: "torrent", label: t("abilities.torrent", { defaultValue: "Torrente" }) },
    { id: "static", label: t("abilities.static", { defaultValue: "Estática" }) },
    { id: "levitate", label: t("abilities.levitate", { defaultValue: "Levitação" }) },
    { id: "intimidate", label: t("abilities.intimidate", { defaultValue: "Intimidação" }) },
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
        setError(`${t("noResult")} "${abilityId}".`);
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
    const cleanTerm = searchTerm.trim().toLowerCase();
    const matched = abilities.find(
      (a) => a.id.toLowerCase() === cleanTerm || a.label.toLowerCase() === cleanTerm,
    );
    const abilityId = matched ? matched.id : cleanTerm;
    handleSearch(abilityId);
  };

  return (
    <div className="search-page-container">
      <div className="search-box-card">
        <h2 className="search-box-title">{t("searchByAbility")}</h2>
        <p className="search-box-desc">{t("searchByAbilityDesc")}</p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder={t("searchByAbilityPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            {t("search")}
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
            <h3 className="empty-state-title">{t("noResult")}</h3>
            <p className="empty-state-desc">{error}</p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="empty-state">
            <span className="empty-state-icon">⚡</span>
            <h3 className="empty-state-title">{t("selectAbility")}</h3>
            <p className="empty-state-desc">{t("searchByAbilityReady")}</p>
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
