export const pokemonDataTransformer = (pokemonData) => {
  return {
    image: {
      0: pokemonData.sprites.other["official-artwork"].front_default,
    },
    alternativeText: `Image of ${pokemonData.name}`,
    name: pokemonData.name,
    number: pokemonData.id,
    type: pokemonData.types,
  };
};
