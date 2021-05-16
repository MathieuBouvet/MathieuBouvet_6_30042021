const possibleUrls = ["assets/data.json", "../assets/data.json"];

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
  return data.photographers;
}

export async function getPhotographerById(photographerId) {
  const data = await dataRequest;
  return data.photographers.find(
    photographer => photographer.id === photographerId
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
    .filter(medium => medium.photographerId === Number(photographerId))
    .map(adjustImagePosition);
}

function adjustImagePosition(medium) {
  const position =
    imagePositionAdjustements[`${medium.photographerId}-${medium.id}`] ??
    "default";
  if ("image" in medium) {
    return { ...medium, position };
  }
  return medium;
}

const imagePositionAdjustements = {
  // Mimi Keel
  ["243-2525345343"]: "nudge-down-tiny",
  ["243-398847109"]: "nudge-down-medium",
  ["243-95234343"]: "nudge-down-tiny",
  // Ellie-Rose Wilkens
  ["930-235234343"]: "nudge-up-tiny",
  ["930-7775342343"]: "nudge-up-tiny",
  ["930-22299394"]: "nudge-down-medium",
  // Tracy Galindo
  ["82-342550"]: "nudge-down-medium",
  ["82-9025895"]: "nudge-down-medium",
  // Nabeel Bradford
  ["527-92352352"]: "nudge-up-tiny",
  ["527-23523533"]: "nudge-down-tiny",
  ["527-525834234"]: "nudge-up-tiny",
  // Rhode Dubois
  ["925-92758372"]: "nudge-down-medium",
  ["925-32958383"]: "nudge-down-medium",
  ["925-23394384"]: "nudge-down-tiny",
  ["925-87367293"]: "nudge-down-big",
  // Marcel Nikolic
  ["195-356234343"]: "nudge-up-tiny",
  ["195-6525666253"]: "nudge-up-tiny"
};
