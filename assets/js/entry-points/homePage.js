import { createRootTemplate, createStore } from "../lib/zip-template/index.js";
import { getAllTags, getPhotographers } from "../dataLayer.js";
import HomePage from "../templates/home-page/index.js";

(async () => {
  const homePageInitialData = {
    tags: await getAllTags(),
    photographers: await getPhotographers(),
    selectedTags: [],
  };

  const homePageStore = createStore(homePageInitialData);

  createRootTemplate(document.getElementById("app"), HomePage(), homePageStore);
})();
