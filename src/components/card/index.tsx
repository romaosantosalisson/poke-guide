import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./card.css";
import { EmojisType, type PokemonType } from "../../types";
import pokeBola from "../../assets/images/logo.svg";

const defaultPokemon: PokemonType = {
  id: "025",
  name: "Pikachu",
  types: ["electric"],
  abilities: [
    { name: "static", color: "#F59E0B" },
    { name: "lightning-rod", color: "#3B82F6" },
  ],
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
};

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

interface CardProps {
  pokemon?: PokemonType;
}

export function Card({ pokemon = defaultPokemon }: CardProps) {
  const { t, i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const getEmojiForType = (type: string) => {
    return EmojisType[normalizeKey(type)] || "⭐";
  };

  const getTranslatedAbility = (name: string) => {
    const clean = (name || "").trim();
    if (!clean) {
      return t("abilities.unknown", {
        defaultValue: t("unknown", { defaultValue: "Desconhecido" }),
      });
    }

    const keyWithHyphen = normalizeKey(clean);
    const keyWithoutHyphen = keyWithHyphen.replace(/-/g, "");

    if (
      keyWithHyphen === "desconhecido" ||
      keyWithHyphen === "unknown" ||
      keyWithHyphen === "desconocido"
    ) {
      return t("abilities.unknown", {
        defaultValue: t("unknown", { defaultValue: "Desconhecido" }),
      });
    }

    if (i18n.exists(`abilities.${keyWithHyphen}`)) {
      return t(`abilities.${keyWithHyphen}`);
    }

    if (i18n.exists(`abilities.${keyWithoutHyphen}`)) {
      return t(`abilities.${keyWithoutHyphen}`);
    }

    return clean
      .split(/[\s-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const cleanPrimaryType = normalizeKey(pokemon.types[0] || "normal");

  const abilitiesList =
    pokemon.abilities && pokemon.abilities.length > 0
      ? pokemon.abilities
      : [{ name: "desconhecido", color: "#64748B" }];

  return (
    <div className="pokemon-card-container">
      <div className={`pokemon-card card-type-${cleanPrimaryType}`}>
        <span className="pokemon-id">#{pokemon.id}</span>

        <div className="pokemon-image-container">
          <div className="pokemon-image-glow" />
          <img
            src={imageError ? pokeBola : pokemon.image}
            alt={pokemon.name}
            className="pokemon-image rounded"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="pokemon-info">
          <h2 className="pokemon-name">{pokemon.name}</h2>

          <div className="pokemon-types">
            {pokemon.types.map((type) => {
              const normalized = normalizeKey(type);
              return (
                <span key={type} className={`type-badge type-${cleanPrimaryType}`}>
                  <span className="type-emoji">{getEmojiForType(type)}</span>
                  <span className="type-label">
                    {t(`types.${normalized}`, { defaultValue: type })}
                  </span>
                </span>
              );
            })}
          </div>

          <div className="pokemon-abilities-section">
            <span className="section-title">{t("abilitiesTitle")}</span>
            <div className="pokemon-abilities">
              {abilitiesList.map((ability, index) => (
                <strong
                  key={index}
                  className="ability-badge"
                  style={{ color: ability.color || "#64748B" }}
                >
                  {getTranslatedAbility(ability.name)}
                </strong>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
