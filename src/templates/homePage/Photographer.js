import { html, template } from "../../../lib/zip-template/index.js";
import Tag from "../ui/Tag.js";
import { getTagsFromUrl } from "../../helpers/urlHash.js";

const Photographer = (
  { id, name, portrait, city, tagline, price, tags, country },
  context
) => {
  const { render } = context;
  const selectedTags = getTagsFromUrl();

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
      <div class="photographer-data">
        <P class="photographer-location">${city}, ${country}</P>
        <P class="photgrapher-tagline">${tagline}</P>
        <P class="photographer-price">${price}€/jour</P>
      </div>
      <ul class="tag-list">
        ${tags.map(tag =>
          render(
            html`<li>
              ${render(
                Tag({
                  label: tag,
                  selectedTags,
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
