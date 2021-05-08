import { html, template } from "../../lib/zip-template/index.js";
import Tag from "../ui/Tag.js";
import { useSelectedTags } from "../../utils/useSelectedTags.js";

const Photographer = template(
  ({ id, name, portrait, city, tagline, price, tags, country }, context) => {
    const { render, useStore } = context;
    const { selectedTags, addTag, removeTag } = useSelectedTags(useStore);
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
  }
);

export default Photographer;
