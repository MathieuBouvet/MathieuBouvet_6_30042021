const dataRequest = (async () =>
  fetch("assets/data.json").then(response =>
    response.json()
  ))();

function shallowCopy(object) {
  return { ...object };
}

export async function getPhotographers() {
  const data = await dataRequest;
  return data.photographers.map(shallowCopy);
}

export async function getPhotographerById(photographerId) {
  const data = await dataRequest;
  return shallowCopy(
    data.photographers.find(photographer => photographer.id === photographerId)
  );
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
    .filter(medium => medium.photographerId === photographerId)
    .map(shallowCopy);
}
