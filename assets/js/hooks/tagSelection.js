import { hook } from "../lib/zip-template/index.js";

function tagSelection({ useStore }) {
  const [selectedTags, setSelectedTags] = useStore(store => store.selectedTags);

  const addTag = tag => setSelectedTags([...selectedTags, tag]);
  const removeTag = tag =>
    setSelectedTags(selectedTags.filter(existingTag => existingTag !== tag));

  return {
    selectedTags,
    addTag,
    removeTag,
  };
}

export default hook(tagSelection);
