import { html, template } from "../../lib/zip-template/index.js";

const Tag = ({ label, selectedTags }) => {
  const selected = selectedTags.includes(label);

  const tagsIfClicked = selected
    ? selectedTags.filter(tag => tag !== label)
    : [...selectedTags, label];

  let url = new URL(window.location);
  if (tagsIfClicked.length > 0) {
    url.hash = "tags:" + tagsIfClicked.join(",");
  } else {
    url.hash = "tags";
  }

  return html`
    <a class="tag ${selected && "selected"}" href="${url}">${label}</a>
  `;
};

export default template(Tag);
