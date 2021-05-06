import { html, template } from "../../lib/zip-template/index.js";

const Tag = template(({ label, id, checked, onCheck, onUncheck }) => {
  const handleChange = e => {
    const handler = e.target.checked ? onCheck : onUncheck;
    handler(label);
  };
  const tagId = id ?? `tag-${label}`
  return html`
    <input
      type="checkbox"
      id="${tagId}"
      @change=${handleChange}
      :checked=${checked}
      class="tag-input sr-only"
    />
    <label class="tag-label" for="${tagId}">#${label}</label>
  `;
});

export default Tag;
