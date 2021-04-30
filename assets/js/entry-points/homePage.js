import { createRootTemplate, createStore } from "../lib/zip-template/index.js";
import { getAllTags, getPhotographers } from "../data-layer/index.js";
import homePageTemplate from "../templates/home-page/index.js";

const homePageInitialData = {
  tags: getAllTags(),
  photographers: getPhotographers(),
};

const homePageStore = createStore(homePageInitialData);

createRootTemplate(document.body, homePageTemplate(), homePageStore);
