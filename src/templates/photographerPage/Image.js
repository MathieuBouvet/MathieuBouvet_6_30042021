import { html, template } from "../../../lib/zip-template/index.js";

const Image = ({ id, title, image, likes, position, liked }, context) => {
  const { useStore } = context;
  const [_, setLiked] = useStore(store => store.media[id].liked);
  const likesCount = likes + (liked ? 1 : 0);
  return html`<figure class="photographer-medium">
    <img
      src="${`../assets/images/photographers-pictures/medium_${image}`}"
      alt=""
      class="${position !== "default" && position}"
    />
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

export default template(Image);
