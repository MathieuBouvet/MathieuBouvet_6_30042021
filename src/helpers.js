export function getTagsFromUrl() {
  const selectedTagsString = new URL(window.location).hash.split(":")[1];
  return selectedTagsString?.split(",") ?? [];
}
