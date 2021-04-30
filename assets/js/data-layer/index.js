import { data } from "./data.js";

function shallowCopy(object) {
  return { ...object };
}

export function getPhotographers() {
  return data.photographers.map(shallowCopy);
}

export function getPhotographerById(photographerId) {
  return shallowCopy(
    data.photographers.find(photographer => photographer.id === photographerId)
  );
}

export function getAllTags() {
  return data.photographers.reduce((tags, photograper) => {
    tags.push(...photograper.tags);
    return tags;
  }, []);
}

export function getMediaForPhotographer(photographerId) {
  return data.media
    .filter(medium => medium.photographerId === photographerId)
    .map(shallowCopy);
}
