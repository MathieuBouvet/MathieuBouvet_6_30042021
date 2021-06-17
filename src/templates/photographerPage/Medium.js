import { html, template } from "../../../lib/zip-template/index.js";
import Image from "../ui/Image.js";
import Video from "../ui/VideoThumbnail.js";

const Medium = (
  { id, title, image, video, likes, liked, dominantColor, altText },
  context
) => {
  const { useStore, render } = context;
  const [, setLiked] = useStore(store => store.media[id].liked);
  const likesCount = likes + (liked ? 1 : 0);

  const [isLoaded, setLoaded] = useStore(store => store.loadedMediumImage[id]);
  const onLoad = () => setLoaded(true);

  const [, setLightboxOpened] = useStore(store => store.lightbox.isOpened);

  const [, setLightboxMediumId] = useStore(store => store.lightbox.mediumId);

  return html`<figure class="photographer-medium">
    <a
      class="lightbox-link"
      aria-label="${altText}, closeup view"
      tabindex="0"
      @click=${() => {
        setLightboxOpened(true);
        setLightboxMediumId(id);
      }}
      @keyup=${e => {
        if (e.key === "Enter") {
          setLightboxOpened(true);
          setLightboxMediumId(id);
        }
      }}
    >
      ${image != null &&
      render(
        Image({
          image,
          isLoaded,
          onLoad,
          altText,
          className: "medium",
          src: "../assets/images/photographers-pictures/medium/" + image,
          placeholderSrc:
            "../assets/images/photographers-pictures/low-res/" + image,
          dominantColor,
        })
      )}
      ${video != null && render(Video({ video, className: "medium", altText, dominantColor }))}
    </a>
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
