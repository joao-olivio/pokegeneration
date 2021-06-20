module.exports = {
  name: "Card",
  context: {
    image: {
      0: "//via.placeholder.com/150",
    },
    alternativeText: "Image placeholder",
    content: "",
    type: "default",
  },
  variants: [
    {
      name: "pokemon",
      context: {
        number: "001",
        title: "Bulbasaur",
        image: {
          0: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    },
    {
      name: "generation",
      context: {
        pathToGeneration: "/go-to-generation-page",
        generation: "IV",
      },
    },
  ],
};
