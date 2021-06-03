import { html, template } from "../../../lib/zip-template/index.js";
import Tag from "../ui/Tag.js";
import Image from "../ui/Image.js";
import { getTagsFromUrl } from "../../helpers/urlHash.js";

const Photographer = (
  { id, name, portrait, city, tagline, price, tags, country, dominantColor },
  context
) => {
  const { render, useStore } = context;
  const selectedTags = getTagsFromUrl();

  const [isLoaded, setLoaded] = useStore(store => store.profilePicsLoaded[id]);

  return html`
    <section class="photographer">
      <a
        class="photographer-link"
        href="pages/photographer?id=${id}"
        aria-label="${name}"
      >
        <figure class="photographer-figure">
          ${render(
            Image({
              className: "photographer-portrait",
              alt: "",
              src: `assets/images/profile-pictures/small/${portrait}`,
              placeholderSrc: `assets/images/profile-pictures/low-res/${portrait}`,
              isLoaded,
              onLoad: () => setLoaded(true),
              dominantColor,
            })
          )}
          <figcaption><h2 class="photographer-name">${name}</h2></figcaption>
        </figure>
      </a>
      <div class="photographer-data">
        <p class="photographer-location">${city}, ${country}</p>
        <p class="photgrapher-tagline">${tagline}</p>
        <p class="photographer-price">${price}€/jour</p>
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
