import { html, template } from "../../../lib/zip-template/index.js";
import Medium from "./Medium.js";
import Tag from "../ui/Tag.js";
import { getTagsFromUrl } from "../../helpers/urlHash.js";
import { sortFns } from "../../helpers/sortMedia.js";

const PhotgrapherPage = ({ useStore, render, useEffect }) => {
  const [photographer] = useStore(store => store.photographer);
  const [media] = useStore(store => store.media);
  const [sortBy, setSortBy] = useStore(store => store.mediaFilter);

  const selectedTags = getTagsFromUrl();

  const filteredMedia = Object.values(media).filter(medium =>
    selectedTags.every(selectedTag => medium.tags.includes(selectedTag))
  );

  filteredMedia.sort(sortFns[sortBy]);

  const { name, city, tagline, portrait, country } = photographer;

  return html`<div id="app">
    <header>
      <a class="home-link" href="..">
        <img
          id="fisheye-logo"
          src="../assets/images/fisheye-logo.png"
          alt="Fish Eye Homepage"
        />
      </a>
    </header>
    <main>
      <section id="photographer">
        <div class="photographer-container">
          <div class="photographer-info-wrapper">
            <h1 class="photographer-name">${name}</h1>
            <div class="photographer-data">
              <p class="photographer-location">${city}, ${country}</p>
              <p class="photographer-tagline">${tagline}</p>
            </div>
          </div>
          <div class="contact-button-wrapper">
            <button aria-label="contact me" class="contact-button">
              Contactez-moi
            </button>
          </div>
          <img
            class="photographer-portrait"
            src="../assets/images/photographers/small-${portrait}"
            alt="${name}"
          />
        </div>
        <ul class="tag-list">
          ${photographer.tags.map(tag =>
            render(
              html`<li>
                ${render(Tag({ label: tag, selectedTags, replaceMode: true }))}
              </li>`
            )
          )}
        </ul>
      </section>
      <div class="sort-media-container">
        <label for="sort-media">Trier par :</label>
        <select id="sort-media" @change=${e => setSortBy(e.target.value)}>
          <option value="popularity" :selected=${sortBy === "popularity"}>
            Popularité
          </option>
          <option value="date" :selected=${sortBy === "date"}>Date</option>
          <option value="title" :selected=${sortBy === "title"}>Titre</option>
        </select>
      </div>
      <section id="media">
        ${filteredMedia.map(mediumData => {
          return render(Medium(mediumData));
        })}
        ${filteredMedia.length === 0 &&
        render(html`<p class="no-result-info">Aucun media</p>`)}
      </section>
    </main>
  </div>`;
};

export default template(PhotgrapherPage);
