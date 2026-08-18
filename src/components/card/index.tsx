import { useState } from "react";
import "./card.css";
import { EmojisType, type PokemonType } from "../../types";
import pokeBola from "../../assets/images/logo.svg";

const defaultPokemon: PokemonType = {
  id: "025",
  name: "Pikachu",
  types: ["eletrico"],
  abilities: [
    { name: "Estática", color: "#F59E0B" },
    { name: "Para-Raios", color: "#3B82F6" },
  ],
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
};

const normalizeType = (type: string) =>
  type
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

interface CardProps {
  pokemon?: PokemonType;
}

export function Card({ pokemon = defaultPokemon }: CardProps) {
  const [imageError, setImageError] = useState(false);

  const getEmojiForType = (type: string) => {
    return EmojisType[normalizeType(type)] || "⭐";
  };

  const cleanPrimaryType = normalizeType(pokemon.types[0] || "normal");

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
            {pokemon.types.map((type) => (
              <span key={type} className={`type-badge type-${cleanPrimaryType}`}>
                <span className="type-emoji">{getEmojiForType(type)}</span>
                <span className="type-label">{type}</span>
              </span>
            ))}
          </div>

          <div className="pokemon-abilities-section">
            <span className="section-title">Habilidades:</span>
            <div className="pokemon-abilities">
              {pokemon.abilities.map((ability, index) => (
                <strong key={index} className="ability-badge" style={{ color: ability.color }}>
                  {ability.name}
                </strong>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
