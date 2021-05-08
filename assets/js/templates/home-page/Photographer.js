import { html, template } from "../../lib/zip-template/index.js";
import Tag from "../ui/Tag.js";
import tagSelection from "../../hooks/tagSelection.js";

const Photographer = (
  { id, name, portrait, city, tagline, price, tags, country },
  context
) => {
  const { render, use } = context;
  const { selectedTags, addTag, removeTag } = use(tagSelection());
  return html`
    <section class="photographer">
      <a
        class="photographer-link"
        href="pages/photographer?id=${id}"
        aria-label="${name}"
      >
        <figure class="photographer-figure">
          <img
            src="assets/images/photographers/small-${portrait}"
            alt=""
            class="photographer-portrait"
          />
          <figcaption><h2 class="photographer-name">${name}</h2></figcaption>
        </figure>
      </a>
      <p class="photographer-data">
        <span class="photographer-location">${city}, ${country}</span>
        <span class="photgrapher-tagline">${tagline}</span>
        <span class="photographer-price">${price}€/jour</span>
      </p>
      <ul class="tag-list">
        ${tags.map(tag =>
          render(
            html`<li>
              ${render(
                Tag({
                  label: tag,
                  id: `photographer-${id}-tag-${tag}`,
                  checked: selectedTags.includes(tag),
                  onCheck: addTag,
                  onUncheck: removeTag,
                })
              )}
            </li>`
          )
        )}
      </ul>
    </section>
  `;
};

export default template(Photographer);
