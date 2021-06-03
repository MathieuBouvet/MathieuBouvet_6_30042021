import { html, template } from "../../../lib/zip-template/index.js";
import Medium from "./Medium.js";
import Image from "../ui/Image.js";
import Tag from "../ui/Tag.js";
import { getTagsFromUrl } from "../../helpers/urlHash.js";
import { sortFns } from "../../helpers/sortMedia.js";
import ContactModale from "./ContactModal.js";

const PhotgrapherPage = ({ useStore, render }) => {
  const [photographer] = useStore(store => store.photographer);
  const [media] = useStore(store => store.media);
  const [sortBy, setSortBy] = useStore(store => store.mediaFilter);
  const [isContactModalOpen, setContactModalOpen] = useStore(
    store => store.contactModal.isOpened
  );

  const selectedTags = getTagsFromUrl();

  const filteredMedia = Object.values(media).filter(medium =>
    selectedTags.every(selectedTag => medium.tags.includes(selectedTag))
  );

  const [isLoaded, setLoaded] = useStore(store => store.loadedProfilePic);

  filteredMedia.sort(sortFns[sortBy]);

  const { name, city, tagline, portrait, country, price } = photographer;

  const totalLikes = Object.values(media).reduce((totalLikes, medium) => {
    return totalLikes + medium.likes + medium.liked;
  }, 0);

  return html`<div id="app">
    <header aria-hidden="${isContactModalOpen.toString()}">
      <a class="home-link" href="..">
        <img
          id="fisheye-logo"
          src="../assets/images/fisheye-logo.png"
          alt="Fish Eye Homepage"
        />
      </a>
    </header>
    <main aria-hidden="${isContactModalOpen.toString()}">
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
            <button
              aria-label="contact me"
              class="contact-button main-button"
              @click=${() => setContactModalOpen(true)}
            >
              Contactez-moi
            </button>
          </div>
          ${render(
            Image({
              className: "photographer-portrait",
              altText: name,
              src: `../assets/images/profile-pictures/small/${portrait}`,
              placeholderSrc: `../assets/images/profile-pictures/low-res/${portrait}`,
              isLoaded,
              onLoad: () => setLoaded(true),
            })
          )}
        </div>
        <div class="additional-info">
          <p>
            ${totalLikes.toLocaleString()}
            <i class="fa fa-heart"></i>
            <span class="sr-only">likes</span>
          </p>
          <p>${price}€ / jour</p>
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
    ${isContactModalOpen && render(ContactModale({ photographerName: name }))}
  </div>`;
};

export default template(PhotgrapherPage);
