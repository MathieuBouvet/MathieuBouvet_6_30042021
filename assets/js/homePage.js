import { createRootTemplate, createStore } from "../../lib/zip-template/index.js";
import { getAllTags, getPhotographers } from "../../src/dataLayer.js";
import HomePage from "../../src/templates/homePage/index.js";

(async () => {
  
  const homePageInitialData = {
    tags: await getAllTags(),
    photographers: await getPhotographers(),
    isAwayFromTop: false,
    goToContentAnimationEnded: true,
  };

  const homePageStore = createStore(homePageInitialData);

  createRootTemplate(document.getElementById("app"), HomePage(), homePageStore);
})();
