import { html, template } from "../../lib/zip-template/index.js";
import Photographer from "./Photographer.js";
import Tag from "../ui/Tag.js";
import { useSelectedTags } from "./useSelectedTags.js";

const HomePage = template(({ render, useStore }) => {
  const [tags] = useStore(store => store.tags);

  const { selectedTags, addTag, removeTag } = useSelectedTags(useStore);
  const [photographers] = useStore(store => store.photographers);

  const filteredPhotographers = photographers.filter(photographer =>
    selectedTags.every(selectedTag => photographer.tags.includes(selectedTag))
  );

  return html`
    <section id="app">
      <header>
        <a href="">
          <img
            id="fisheye-logo"
            src="assets/images/fisheye-logo.png"
            alt="Fish Eye Homepage"
          />
        </a>
        <nav aria-label="photographer categories">
          <ul class="tag-list">
            ${tags.map(tag =>
              render(
                html`<li>
                  ${render(
                    Tag({
                      label: tag,
                      checked: selectedTags.includes(tag),
                      onCheck: addTag,
                      onUncheck: removeTag,
                    })
                  )}
                </li>`
              )
            )}
          </ul>
        </nav>
      </header>
      <main>
        <h1 id="app-title">Nos Photographes</h1>
        ${filteredPhotographers.map(photographer =>
          render(Photographer({ ...photographer }))
        )}
      </main>
    </section>
  `;
});

export default HomePage;
