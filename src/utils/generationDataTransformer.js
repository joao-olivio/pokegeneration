import { GENERATION_BASE_URL } from "../router/settings";

export const generationDataTransformer = (generationData) => {
  return {
    id: generationData.id,
    slug: generationData.name,
    mainRegion: generationData.main_region.name,
    name: generationData.names.filter((name) => name.language.name === "en")[0]
      .name,
    pokemons: generationData.pokemon_species,
    games: generationData.version_groups,
    url: `${GENERATION_BASE_URL}${generationData.name}`,
  };
};
