import { html, template } from "../../lib/zip-template/index.js";

const Tag = template(({ label, checked, onCheck, onUncheck }) => {
  const handleChange = e => {
    const handler = e.target.checked ? onCheck : onUncheck;
    handler(label);
  };
  return html`
    <input
      type="checkbox"
      id="tag-${label}"
      @change=${handleChange}
      :checked=${checked}
    />
    <label for="tag-${label}">#${label}</label>
  `;
});

export default Tag;
