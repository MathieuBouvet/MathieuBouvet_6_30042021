import { html, template } from "../../../lib/zip-template/index.js";
import Image from "./Image.js";
import Video from "./Video.js";

const Medium = (
  { id, title, image, video, likes, position, liked },
  context
) => {
  const { useStore, render } = context;
  const [_, setLiked] = useStore(store => store.media[id].liked);
  const likesCount = likes + (liked ? 1 : 0);
  return html`<figure class="photographer-medium">
    ${image != null && render(Image({ image, position }))}
    ${video != null && render(Video({ video }))}
    <figcaption class="medium-info">
      <h2 class="medium-title">${title}</h2>
      <p class="likes">${likesCount} <span class="sr-only">likes</span></p>
      <button
        aria-label="${liked ? "unlike" : "like"} ${title}"
        class="like-button"
        @click=${() => {
          setLiked(value => !value);
        }}
      >
        <i class="fa fa-heart like-icon ${!liked && "empty"}"></i>
      </button>
    </figcaption>
  </figure>`;
};

export default template(Medium);
