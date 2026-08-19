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

interface PokeApiPokemonEntry {
  pokemon: {
    name: string;
    url: string;
  };
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
            detail.abilities && detail.abilities.length > 0
              ? detail.abilities.map((a: RawPokeApiAbility, abilityIndex: number) => ({
                  name: a.ability.name,
                  color: abilityColors[(index + abilityIndex) % abilityColors.length],
                }))
              : [{ name: "desconhecido", color: "#64748B" }];

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

export async function getPokemonByNameOrId(nameOrId: string): Promise<PokemonType | null> {
  const clean = nameOrId.toLowerCase().trim();
  if (!clean) return null;

  try {
    const response = await fetch(`${baseUrl}/pokemon/${clean}`);
    if (!response.ok) return null;
    const detail: RawPokeApiPokemon = await response.json();

    const capitalizedName = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
    const types = detail.types?.map((t: RawPokeApiType) => t.type.name) || [];
    const abilities: AbilityType[] =
      detail.abilities && detail.abilities.length > 0
        ? detail.abilities.map((a: RawPokeApiAbility, index: number) => ({
            name: a.ability.name,
            color: abilityColors[index % abilityColors.length],
          }))
        : [{ name: "desconhecido", color: "#64748B" }];

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
    console.error(`Erro ao buscar Pokémon por nome/ID (${nameOrId}):`, error);
    return null;
  }
}

export async function getPokemonsByType(typeName: string): Promise<PokemonType[]> {
  const clean = typeName.toLowerCase().trim();
  if (!clean) return [];

  try {
    const response = await fetch(`${baseUrl}/type/${clean}`);
    if (!response.ok) return [];
    const data = await response.json();

    const pokemonList = data.pokemon.slice(0, 20);

    const pokemons: PokemonType[] = await Promise.all(
      pokemonList.map(
        async (pItem: PokeApiPokemonEntry, index: number): Promise<PokemonType | null> => {
          try {
            const detailRes = await fetch(pItem.pokemon.url);
            if (!detailRes.ok) return null;
            const detail: RawPokeApiPokemon = await detailRes.json();

            const capitalizedName = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
            const types = detail.types?.map((t: RawPokeApiType) => t.type.name) || [];
            const abilities: AbilityType[] =
              detail.abilities && detail.abilities.length > 0
                ? detail.abilities.map((a: RawPokeApiAbility, abilityIndex: number) => ({
                    name: a.ability.name,
                    color: abilityColors[(index + abilityIndex) % abilityColors.length],
                  }))
                : [{ name: "desconhecido", color: "#64748B" }];

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
          } catch {
            return null;
          }
        },
      ),
    ).then((results) => results.filter((p): p is PokemonType => p !== null));

    return pokemons;
  } catch (error) {
    console.error(`Erro ao buscar Pokémons por tipo (${typeName}):`, error);
    return [];
  }
}

export async function getPokemonsByAbility(abilityName: string): Promise<PokemonType[]> {
  const clean = abilityName.toLowerCase().trim().replace(/\s+/g, "-");
  if (!clean) return [];

  try {
    const response = await fetch(`${baseUrl}/ability/${clean}`);
    if (!response.ok) return [];
    const data = await response.json();

    const pokemonList = data.pokemon.slice(0, 20);

    const pokemons: PokemonType[] = await Promise.all(
      pokemonList.map(
        async (pItem: PokeApiPokemonEntry, index: number): Promise<PokemonType | null> => {
          try {
            const detailRes = await fetch(pItem.pokemon.url);
            if (!detailRes.ok) return null;
            const detail: RawPokeApiPokemon = await detailRes.json();

            const capitalizedName = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
            const types = detail.types?.map((t: RawPokeApiType) => t.type.name) || [];
            const abilities: AbilityType[] =
              detail.abilities && detail.abilities.length > 0
                ? detail.abilities.map((a: RawPokeApiAbility, abilityIndex: number) => ({
                    name: a.ability.name,
                    color: abilityColors[(index + abilityIndex) % abilityColors.length],
                  }))
                : [{ name: "desconhecido", color: "#64748B" }];

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
          } catch {
            return null;
          }
        },
      ),
    ).then((results) => results.filter((p): p is PokemonType => p !== null));

    return pokemons;
  } catch (error) {
    console.error(`Erro ao buscar Pokémons por habilidade (${abilityName}):`, error);
    return [];
  }
}
