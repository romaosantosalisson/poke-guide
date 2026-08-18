export type AbilityType = {
  name: string;
  color: string;
};

export type PokemonType = {
  id: string;
  image: string;
  name: string;
  types: string[];
  abilities: AbilityType[];
};
