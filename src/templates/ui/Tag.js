import { html, template } from "../../../lib/zip-template/index.js";

const Tag = ({ label, selectedTags, replaceMode = false }) => {
  const selected = selectedTags.includes(label);

  const tagsIfClicked = selected
    ? selectedTags.filter(tag => tag !== label)
    : [...(!replaceMode ? selectedTags : []), label];

  let url = new URL(window.location);
  if (tagsIfClicked.length > 0) {
    url.hash = "tags:" + tagsIfClicked.join(",");
  } else {
    url.hash = "tags";
  }

  return html`
    <a
      class="tag ${selected && "selected"}"
      href="${url}"
      aria-label="${label}"
      aria-description="${selected
        ? "retire"
        : "ajoute"} le tag de la liste des filtres"
    >
      ${label}
    </a>
  `;
};

export default template(Tag);
