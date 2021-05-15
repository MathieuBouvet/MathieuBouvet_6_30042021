import { html, template } from "../../lib/zip-template/index.js";

const PhotgrapherPage = ({ useStore, render }) => {
  const [photographer] = useStore(store => store.photographer);
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
            <p class="photographer-data">
              <span class="photographer-location">${city}, ${country}</span>
              <span class="photographer-tagline">${tagline}</span>
            </p>
          </div>
          <img
            class="photographer-portrait"
            src="../assets/images/photographers/small-${portrait}"
            alt="${name}"
          />
        </div>
        <ul class="tag-list">
          ${photographer.tags.map(tag =>
            render(html`<li class="tag-label">${tag}</li>`)
          )}
        </ul>
      </section>
      <section>

      </section>
    </main>
  </div>`;
};

export default template(PhotgrapherPage);
