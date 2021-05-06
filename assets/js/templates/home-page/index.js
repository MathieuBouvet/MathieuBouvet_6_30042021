import { html, template } from "../../lib/zip-template/index.js";
import Photographer from "./Photographer.js";
import Tag from "../ui/Tag.js";

const HomePage = template((_, { read, write, render }) => {
  const tags = read(store => store.tags);
  const selectedTags = read(store => store.selectedTags);
  const addTag = tag => write(store => store.selectedTags.push(tag));
  const removeTag = tag =>
    write(
      store =>
        (store.selectedTags = store.selectedTags.filter(
          existingTag => existingTag !== tag
        ))
    );

  const photographers = read(store => store.photographers);

  const filteredPhotographers = photographers.filter(photographer =>
    selectedTags.every(selectedTag => photographer.tags.includes(selectedTag))
  );

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
        <h1>Nos Photographes</h1>
        ${filteredPhotographers.map(photographer =>
          render(Photographer({ ...photographer }))
        )}
      </main>
    </body>
  `;
});

export default HomePage;
