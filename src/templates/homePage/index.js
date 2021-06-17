import { html, template } from "../../../lib/zip-template/index.js";
import Photographer from "./Photographer.js";
import Tag from "../ui/Tag.js";
import GoToContent from "./GoToContent.js";
import { getTagsFromUrl, getHashParams, getHashString } from "../../helpers/urlHash.js";

function getCenteredClass(photographerNumber) {
  let centeredClass = "";
  if (photographerNumber % 3 !== 0) {
    centeredClass += "centered-large ";
  }
  if (photographerNumber % 2 !== 0) {
    centeredClass += "centered-medium";
  }
  return centeredClass;
}

const HomePage = template(({ render, useStore, useEffect }) => {
  const selectedTags = getTagsFromUrl();

  const [tags] = useStore(store => store.tags);

  const [, setIsAwayFromTop] = useStore(store => store.isAwayFromTop);

  const [photographers] = useStore(store => store.photographers);

  const filteredPhotographers = photographers.filter(photographer =>
    selectedTags.every(selectedTag => photographer.tags.includes(selectedTag))
  );

  const hashParams = getHashParams(window.location);
  hashParams["main-content"] = [];

  useEffect(() => {
    const homepageHeader = document.getElementById("homepage-header");
    const observer = new IntersectionObserver(entries => {
      setIsAwayFromTop(!entries[0].isIntersecting);
    });
    observer.observe(homepageHeader);

    return () => observer.disconnect();
  });

  return html`
    <div id="app">
      <header id="homepage-header">
        ${render(GoToContent())}
        <a class="home-link" href="">
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
                      selectedTags,
                    })
                  )}
                </li>`
              )
            )}
          </ul>
        </nav>
      </header>
      <main
        id="${getHashString(hashParams)}"
        class="main-content ${getCenteredClass(filteredPhotographers.length)}"
      >
        <h1 id="app-title">Nos Photographes</h1>
        ${filteredPhotographers.map(photographer =>
          render(Photographer({ ...photographer }))
        )}
        ${filteredPhotographers.length === 0 &&
        render(html`<p class="no-result-info">Aucun photographe</p>`)}
      </main>
    </div>
  `;
});

export default HomePage;
