import { createRootTemplate, createStore } from "../lib/zip-template/index.js";
import { getPhotographerById, getMediaForPhotographer } from "../dataLayer.js";
import PhotographerPage from "../templates/photographerPage/index.js";

(async () => {
  const photographerId = new URLSearchParams(window.location.search).get("id");

  const photographerPageData = {
    photographer: await getPhotographerById(Number(photographerId)),
    media: await getMediaForPhotographer(photographerId),
  };

  const store = createStore(photographerPageData);

  createRootTemplate(document.getElementById("app"), PhotographerPage(), store);
})();
