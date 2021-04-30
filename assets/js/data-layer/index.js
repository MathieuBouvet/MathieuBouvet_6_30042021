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
  const tagSet = new Set();
  data.photographers.reduce((tagSet, photographer) => {
    photographer.tags.forEach(tag => tagSet.add(tag));
    return tagSet;
  }, tagSet);
  return [...tagSet];
}

export function getMediaForPhotographer(photographerId) {
  return data.media
    .filter(medium => medium.photographerId === photographerId)
    .map(shallowCopy);
}
