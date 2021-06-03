import {
  addProfilePicDominantColor,
  addLikedAttribute,
  addPictureDominantColor,
  mapById,
} from "./dataTransform.js";

const possibleUrls = ["./assets/data.json", "../assets/data.json"];

const requests = possibleUrls.map(url =>
  fetch(url).then(response => {
    if (!response.ok) {
      return Promise.reject();
    }
    return response.json();
  })
);

const dataRequest = (async () => Promise.any(requests))();

export async function getPhotographers() {
  const data = await dataRequest;
  return data.photographers.map(addProfilePicDominantColor);
}

export async function getPhotographerById(photographerId) {
  const data = await dataRequest;
  const photographer = data.photographers.find(
    photographer => photographer.id === photographerId
  );
  return addProfilePicDominantColor(photographer);
}

export async function getAllTags() {
  const data = await dataRequest;
  const tagSet = new Set();
  data.photographers.reduce((tagSet, photographer) => {
    photographer.tags.forEach(tag => tagSet.add(tag));
    return tagSet;
  }, tagSet);
  return [...tagSet];
}

export async function getMediaForPhotographer(photographerId) {
  const data = await dataRequest;
  return data.media
    .filter(medium => medium.photographerId === Number(photographerId))
    .map(addPictureDominantColor)
    .map(addLikedAttribute)
    .reduce(mapById, {});
}
