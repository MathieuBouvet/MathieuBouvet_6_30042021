import {
  createRootTemplate,
  createStore,
} from "../../lib/zip-template/index.js";
import { getAllTags, getPhotographers } from "../../src/dataLayer/requests.js";

import HomePage from "../../src/templates/homePage/index.js";

(async () => {
  const photographers = await getPhotographers();

  const homePageInitialData = {
    tags: await getAllTags(),
    photographers,
    isAwayFromTop: false,
    goToContentAnimationEnded: true,
    profilePicsLoaded: Object.values(photographers).reduce(
      (acc, photographer) => {
        acc[photographer.id] = false;
        return acc;
      },
      {}
    ),
  };

  const homePageStore = createStore(homePageInitialData);

  createRootTemplate(document.getElementById("app"), HomePage(), homePageStore);
})();
