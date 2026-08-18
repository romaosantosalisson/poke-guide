import type { AbilityType, PokemonType } from "../types";
import { baseUrl } from "./api";

export interface PaginatedPokemonResponse {
  pokemons: PokemonType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CACHE_PREFIX = "pokeguide_cache_page_";
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

interface CachedPageData {
  timestamp: number;
  data: PaginatedPokemonResponse;
}

const abilityColors = [
  "#EF4444",
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

interface RawPokeApiType {
  type: {
    name: string;
  };
}

interface RawPokeApiAbility {
  ability: {
    name: string;
  };
}

interface RawPokeApiPokemon {
  id: number;
  name: string;
  sprites?: {
    front_default?: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
  types?: RawPokeApiType[];
  abilities?: RawPokeApiAbility[];
}

export async function getPokemons(
  page: number = 1,
  limit: number = 8,
): Promise<PaginatedPokemonResponse> {
  const cacheKey = `${CACHE_PREFIX}${page}_limit_${limit}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: CachedPageData = JSON.parse(cached);
      const isExpired = Date.now() - parsed.timestamp > CACHE_EXPIRATION_MS;

      if (!isExpired && parsed.data?.pokemons?.length > 0) {
        return parsed.data;
      }
    }
  } catch (error) {
    console.warn("Erro ao ler cache do localStorage:", error);
  }

  const offset = (page - 1) * limit;
  const response = await fetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error(`Falha na requisição: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const totalCount: number = data.count;
  const totalPages = Math.ceil(totalCount / limit);

  const pokemons: PokemonType[] = await Promise.all(
    data.results.map(
      async (pokemonItem: { name: string; url: string }, index: number): Promise<PokemonType> => {
        try {
          const detailRes = await fetch(pokemonItem.url);
          if (!detailRes.ok) {
            throw new Error(`Erro ao buscar detalhes de ${pokemonItem.name}`);
          }
          const detail: RawPokeApiPokemon = await detailRes.json();

          const capitalizedName = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);

          const types = detail.types?.map((t: RawPokeApiType) => t.type.name) || [];

          const abilities: AbilityType[] =
            detail.abilities?.map((a: RawPokeApiAbility, abilityIndex: number) => ({
              name: a.ability.name.replace(/-/g, " "),
              color: abilityColors[(index + abilityIndex) % abilityColors.length],
            })) || [];

          return {
            id: String(detail.id).padStart(3, "0"),
            name: capitalizedName,
            image:
              detail.sprites?.other?.["official-artwork"]?.front_default ||
              detail.sprites?.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
            types,
            abilities,
          };
        } catch (error) {
          console.error(`Erro ao buscar Pokémon ${pokemonItem.name}:`, error);
          const fallbackId = String(offset + index + 1).padStart(3, "0");
          return {
            id: fallbackId,
            name: pokemonItem.name.charAt(0).toUpperCase() + pokemonItem.name.slice(1),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${offset + index + 1}.png`,
            types: ["normal"],
            abilities: [{ name: "Desconhecido", color: "#64748B" }],
          };
        }
      },
    ),
  );

  const result: PaginatedPokemonResponse = {
    pokemons,
    totalCount,
    totalPages,
    currentPage: page,
  };

  // 3. Salvar no Cache (LocalStorage)
  try {
    const cachePayload: CachedPageData = {
      timestamp: Date.now(),
      data: result,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
  } catch (error) {
    console.warn("Não foi possível salvar no localStorage (limite atingido?):", error);
  }

  return result;
}

export async function getAllPokemons(page: number = 1, limit: number = 8): Promise<PokemonType[]> {
  const result = await getPokemons(page, limit);
  return result.pokemons;
}
