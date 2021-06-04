import {
  createRootTemplate,
  createStore,
} from "../../lib/zip-template/index.js";
import {
  getPhotographerById,
  getMediaForPhotographer,
} from "../../src/dataLayer/requests.js";
import PhotographerPage from "../../src/templates/photographerPage/index.js";

(async () => {
  const photographerId = new URLSearchParams(window.location.search).get("id");

  const photographerMedia = await getMediaForPhotographer(photographerId);

  const photographerPageData = {
    photographer: await getPhotographerById(Number(photographerId)),
    media: photographerMedia,
    mediaFilter: "popularity",
    contactModal: {
      isOpened: false,
      isClosing: false,
    },
    loadedMediumImage: Object.keys(photographerMedia).reduce(
      (media, mediumId) => {
        media[mediumId] = false;
        return media;
      },
      {}
    ),
    loadedProfilePic: false,
    lightbox: {
      isOpened: false,
      isClosing: false,
      mediumId: null,
      pictureLoaded: false,
    },
  };

  const store = createStore(photographerPageData);

  createRootTemplate(document.getElementById("app"), PhotographerPage(), store);
})();
