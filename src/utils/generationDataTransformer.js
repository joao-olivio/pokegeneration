import { GENERATION_BASE_URL } from "../router/settings";
import { pokemonSpeciesDataTransformer } from "./pokemonDataTransformer";

export const generationDataTransformer = (generationData) => {
  return {
    id: generationData.id,
    slug: generationData.name,
    mainRegion: generationData.main_region.name,
    name: generationData.names.filter((name) => name.language.name === "en")[0]
      .name,
    pokemons: [...generationData.pokemon_species]
      .map((gen) => pokemonSpeciesDataTransformer(gen))
      .sort((a, b) => a.id - b.id),
    games: generationData.version_groups,
    url: `${GENERATION_BASE_URL}${generationData.name}`,
  };
};
