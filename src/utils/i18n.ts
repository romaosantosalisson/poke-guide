import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { abilityTranslations } from "../locales/abilities";

const resources = {
  "pt-BR": {
    translation: {
      title: "Poke Guide",
      home: "Início",
      searchByName: "Buscar por nome",
      searchByType: "Buscar por Tipo",
      searchByAbility: "Buscar por Habilidade",
      footer: "construído com ❤️ e ☕ por",
      search: "Buscar",
      searchPlaceholder: "Ex: pikachu, charizard, 25...",
      searchByTypePlaceholder: "Ex: fire, water, grass, electric...",
      searchByAbilityPlaceholder: "Ex: static, blaze, overgrow...",
      result: "Resultado da busca",
      noResult: "Nenhum Pokémon encontrado",
      readyToSearch: "Pronto para buscar",
      selectType: "Selecione um tipo",
      selectAbility: "Selecione uma habilidade",
      found: "Pokémons Encontrados",
      abilitiesTitle: "Habilidades:",
      pokemonList: "Lista de Pokémon's",
      pageInfo: "Página {{currentPage}} de {{totalPages}} • Total: {{totalCount}}",
      prev: "Anterior",
      next: "Próximo",
      unknown: "Desconhecido",
      searchByNameDesc: "Digite o nome exato ou o número (ID) do Pokémon para ver seus detalhes.",
      searchByNameReady:
        "Insira o nome de um Pokémon ou clique em uma das sugestões acima para iniciar sua busca.",
      searchByTypeDesc:
        "Selecione um dos tipos abaixo ou digite o nome do tipo para ver os Pokémons correspondentes.",
      searchByTypeReady:
        "Escolha um dos tipos elementares acima ou digite no campo para ver a lista de Pokémons daquele elemento.",
      searchByAbilityDesc:
        "Digite ou selecione uma das habilidades abaixo para ver os Pokémons que a possuem.",
      searchByAbilityReady:
        "Escolha uma habilidade na lista acima ou faça uma busca personalizada para listar os Pokémons.",
      types: {
        normal: "Normal",
        fire: "Fogo",
        water: "Água",
        grass: "Grama",
        electric: "Elétrico",
        ice: "Gelo",
        fighting: "Lutador",
        poison: "Veneno",
        ground: "Terra",
        flying: "Voador",
        psychic: "Psíquico",
        bug: "Inseto",
        rock: "Pedra",
        ghost: "Fantasma",
        dragon: "Dragão",
        dark: "Sombrio",
        steel: "Aço",
        fairy: "Fada",
      },
      abilities: {
        ...abilityTranslations["pt-BR"],
      },
    },
  },
  "en-US": {
    translation: {
      title: "Poke Guide",
      home: "Home",
      searchByName: "Search by Name",
      searchByType: "Search by Type",
      searchByAbility: "Search by Ability",
      footer: "built with ❤️ and ☕ by",
      search: "Search",
      searchPlaceholder: "Ex: pikachu, charizard, 25...",
      searchByTypePlaceholder: "Ex: fire, water, grass, electric...",
      searchByAbilityPlaceholder: "Ex: static, blaze, overgrow...",
      result: "Search Result",
      noResult: "No Pokémon found",
      readyToSearch: "Ready to search",
      selectType: "Select a type",
      selectAbility: "Select an ability",
      found: "Pokémons Found",
      abilitiesTitle: "Abilities:",
      pokemonList: "Pokémon List",
      pageInfo: "Page {{currentPage}} of {{totalPages}} • Total: {{totalCount}}",
      prev: "Previous",
      next: "Next",
      unknown: "Unknown",
      searchByNameDesc: "Enter the exact name or ID number of the Pokémon to view its details.",
      searchByNameReady:
        "Enter the name of a Pokémon or click one of the suggestions above to start your search.",
      searchByTypeDesc:
        "Select one of the types below or enter the type name to view corresponding Pokémons.",
      searchByTypeReady:
        "Choose one of the elemental types above or type in the field to view the list of Pokémons of that element.",
      searchByAbilityDesc:
        "Enter or select one of the abilities below to view the Pokémons that have it.",
      searchByAbilityReady:
        "Choose an ability from the list above or perform a custom search to list the Pokémons.",
      types: {
        normal: "Normal",
        fire: "Fire",
        water: "Water",
        grass: "Grass",
        electric: "Electric",
        ice: "Ice",
        fighting: "Fighting",
        poison: "Poison",
        ground: "Ground",
        flying: "Flying",
        psychic: "Psychic",
        bug: "Bug",
        rock: "Rock",
        ghost: "Ghost",
        dragon: "Dragon",
        dark: "Dark",
        steel: "Steel",
        fairy: "Fairy",
      },
      abilities: {
        ...abilityTranslations["en-US"],
      },
    },
  },
  "es-ES": {
    translation: {
      title: "Poke Guide",
      home: "Inicio",
      searchByName: "Buscar por nombre",
      searchByType: "Buscar por Tipo",
      searchByAbility: "Buscar por Habilidad",
      footer: "construido con ❤️ y ☕ por",
      search: "Buscar",
      searchPlaceholder: "Ej: pikachu, charizard, 25...",
      searchByTypePlaceholder: "Ej: fire, water, grass, electric...",
      searchByAbilityPlaceholder: "Ej: static, blaze, overgrow...",
      result: "Resultado de la búsqueda",
      noResult: "Ningún Pokémon encontrado",
      readyToSearch: "Listo para buscar",
      selectType: "Seleccione un tipo",
      selectAbility: "Seleccione una habilidad",
      found: "Pokémons Encontrados",
      abilitiesTitle: "Habilidades:",
      pokemonList: "Lista de Pokémon's",
      pageInfo: "Página {{currentPage}} de {{totalPages}} • Total: {{totalCount}}",
      prev: "Anterior",
      next: "Siguiente",
      unknown: "Desconocido",
      searchByNameDesc:
        "Ingrese el nombre exacto o el número (ID) del Pokémon para ver sus detalles.",
      searchByNameReady:
        "Ingrese el nombre de un Pokémon o haga clic en una de las sugerencias anteriores para iniciar su búsqueda.",
      searchByTypeDesc:
        "Seleccione uno de los tipos a continuación o ingrese el nombre del tipo para ver los Pokémons correspondientes.",
      searchByTypeReady:
        "Elija uno de los tipos elementales anteriores o escriba en el campo para ver la lista de Pokémons de ese elemento.",
      searchByAbilityDesc:
        "Ingrese o seleccione una de las habilidades a continuación para ver los Pokémons que la poseen.",
      searchByAbilityReady:
        "Elija una habilidad de la lista anterior o realice una búsqueda personalizada para listar los Pokémons.",
      types: {
        normal: "Normal",
        fire: "Fuego",
        water: "Agua",
        grass: "Planta",
        electric: "Eléctrico",
        ice: "Hielo",
        fighting: "Lucha",
        poison: "Veneno",
        ground: "Tierra",
        flying: "Volador",
        psychic: "Psíquico",
        bug: "Bicho",
        rock: "Roca",
        ghost: "Fantasma",
        dragon: "Dragón",
        dark: "Siniestro",
        steel: "Acero",
        fairy: "Hada",
      },
      abilities: {
        ...abilityTranslations["es-ES"],
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
