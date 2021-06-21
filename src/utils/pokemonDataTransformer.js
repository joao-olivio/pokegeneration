import { POKEMON_BASE_URL } from "../router/settings";

export const pokemonDataTransformer = (pokemonData) => {
  return {
    image: {
      0: pokemonData.sprites.other["official-artwork"].front_default,
    },
    alternativeText: `Image of ${pokemonData.name}`,
    name: pokemonData.name,
    number: pokemonData.id,
    type: pokemonData.types,
    url: `${POKEMON_BASE_URL}${pokemonData.name}`,
  };
};

export const pokemonSpeciesDataTransformer = (pokemonEntry) => {
  const urlArray = pokemonEntry.url.split("/");
  const pokemonId = urlArray[urlArray.length - 2];

  return {
    ...pokemonEntry,
    id: Number.parseInt(pokemonId),
  };
};
