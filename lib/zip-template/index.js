/*
  Entry point for the library
*/

export { html } from "./templateParser.js";
export { createStore } from "./store.js";
export { createRootTemplate } from "./rootTemplate.js";

/* 
  Define aliases for the contextProvider function, for code code clarity inside templates or hooks definition
*/
export { contextProvider as template } from "./helpers/contextProvider.js";
export { contextProvider as hook } from "./helpers/contextProvider.js";
