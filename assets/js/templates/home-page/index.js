import { html, template } from "../../lib/zip-template/index.js";
import Photographer from "./photographer.js";

const homePage = template((_, { read, write, render }) => {
  const tags = read(store => store.tags);
  const selectedTag = read(store => store.selectedTag);
  const setSelectedTag = tag => write(store => (store.selectedTag = tag));

  const photographers = read(store => store.photographers);
  const filteredByTag = selectedTag
    ? photographers.filter(photographer =>
        photographer.tags.includes(selectedTag)
      )
    : photographers;

  return html`
    <body>
      <header>
        <a href="">
          <img src="assets/images/fisheye-logo.png" alt="Fish Eye Homepage" />
        </a>
        <nav aria-label="photographer categories">
          <ul>
            ${tags.map(tag =>
              render(
                html`<li>
                  <button
                    class="${selectedTag === tag ? "selected" : ""}"
                    @click=${() => setSelectedTag(tag)}
                  >
                    #${tag}
                  </button>
                </li>`
              )
            )}
          </ul>
        </nav>
      </header>
      <main>
        <h1>Nos Photographes</h1>
        ${filteredByTag.map(photographer =>
          render(Photographer({ ...photographer }))
        )}
      </main>
    </body>
  `;
});

export default homePage;
