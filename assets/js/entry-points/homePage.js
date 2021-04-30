import { createRootTemplate, createStore } from "../lib/zip-template/index.js";
import { getAllTags, getPhotographers } from "../dataLayer.js";
import homePageTemplate from "../templates/home-page/index.js";

(async () => {
  const homePageInitialData = {
    tags: await getAllTags(),
    photographers: await getPhotographers(),
  };

  const homePageStore = createStore(homePageInitialData);

  createRootTemplate(document.body, homePageTemplate(), homePageStore);
})();
