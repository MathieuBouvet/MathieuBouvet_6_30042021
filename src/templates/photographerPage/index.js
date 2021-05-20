import { html, template } from "../../../lib/zip-template/index.js";
import Image from "./Image.js";

const PhotgrapherPage = ({ useStore, render }) => {
  const [photographer] = useStore(store => store.photographer);
  const [media] = useStore(store => store.media);

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
            render(html`<li class="tag">${tag}</li>`)
          )}
        </ul>
      </section>
      <section id="media">
        ${Object.values(media).map(mediumData => {
          const mediumTemplate =
            "image" in mediumData ? Image(mediumData) : "video";
          return render(mediumTemplate);
        })}
      </section>
    </main>
  </div>`;
};

export default template(PhotgrapherPage);
