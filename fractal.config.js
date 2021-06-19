
/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = (module.exports = require("@frctl/fractal").create());

/* Set the title of the project */
fractal.set("project.title", "Pokedex Design System");

/* Tell Fractal where the components will live */
fractal.components.set("path", __dirname + "/fractal/components");

/* Tell Fractal where the documentation pages will live */
fractal.docs.set("path", __dirname + "/fractal/docs");

/* Specify a directory of static assets */
fractal.web.set("static.path", __dirname + "/dist");

/* Set the static HTML build destination */
fractal.web.set("builder.dest", __dirname + "/build");

fractal.web.set("server.sync", true);

fractal.web.set("server.syncOptions", {
  open: true,
  browser: ["google chrome"],
  notify: true,
});

const hbs = require("@frctl/handlebars")({
  helpers: {
    json: val => JSON.stringify(val),
  }
});

fractal.components.engine(hbs);