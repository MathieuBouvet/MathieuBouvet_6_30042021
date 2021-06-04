import { hook } from "../../lib/zip-template/index.js";
import { getTagsFromUrl } from "../helpers/urlHash.js";
import { sortFns } from "../helpers/sortMedia.js";

function matchingMedia({ useStore }) {
  const selectedTags = getTagsFromUrl();
  const [media] = useStore(store => store.media);
  const [sortBy] = useStore(store => store.mediaFilter);

  const filteredMedia = Object.values(media).filter(medium =>
    selectedTags.every(selectedTag => medium.tags.includes(selectedTag))
  );

  filteredMedia.sort(sortFns[sortBy]);

  return filteredMedia;
}

export default hook(matchingMedia);
