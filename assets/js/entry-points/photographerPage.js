import { createRootTemplate, createStore } from "../lib/zip-template/index.js";
import { getPhotographerById } from "../dataLayer.js";
import PhotographerPage from "../templates/photographerPage/index.js";

(async () => {
  const photographerId = new URLSearchParams(window.location.search).get("id");

  const photographerPageData = {
    photographer: await getPhotographerById(Number(photographerId)),
  };

  const store = createStore(photographerPageData);

  createRootTemplate(document.getElementById("app"), PhotographerPage(), store);
})();
