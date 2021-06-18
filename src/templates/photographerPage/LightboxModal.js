import { html, template } from "../../../lib/zip-template/index.js";
import matchingMedia from "../../hooks/matchingMedia.js";
import Image from "../ui/Image.js";
import Video from "../ui/Video.js";

const LightboxModal = context => {
  const { useEffect, useStore, use, render } = context;

  const media = use(matchingMedia());

  const [, setOpened] = useStore(store => store.lightbox.isOpened);
  const [isClosing, setClosing] = useStore(store => store.lightbox.isClosing);
  const [isLoaded, setLoaded] = useStore(store => store.lightbox.pictureLoaded);

  const [mediumId, setMediumId] = useStore(store => store.lightbox.mediumId);

  const [medium] = useStore(store => store.media[mediumId]);

  const mediumIndex = media.findIndex(medium => medium.id === mediumId);

  const nextMediaId = media[(mediumIndex + 1) % media.length].id;
  const previousMediaId =
    media[(mediumIndex + media.length - 1) % media.length].id;

  useEffect(() => {
    const lightboxModalElement = document.getElementById("lightbox-modal");
    if (!lightboxModalElement.contains(document.activeElement)) {
      lightboxModalElement.focus(); // preserve the children focus state
    }
  });

  const closeModal = () => {
    setClosing(true);
  };

  const closingModalFinished = e => {
    if (e.animationName === "disappear") {
      setOpened(false);
      setClosing(false);
      setMediumId(null);
      setLoaded(false);
    }
  };

  const nextPicture = () => {
    if (nextMediaId !== mediumId) {
      setLoaded(false);
      setMediumId(nextMediaId);
    }
  };

  const previousPicture = () => {
    if (nextMediaId !== mediumId) {
      setLoaded(false);
      setMediumId(previousMediaId);
    }
  };

  return html`<div
    class="modal-container ${isClosing && "fade"}"
    role="dialog"
    aria-label="image closeup view"
    @click=${e => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }}
  >
    <section
      id="lightbox-modal"
      tabindex="-1"
      class="modal-content ${isClosing && "closing"}"
      @animationend=${closingModalFinished}
      @keyup=${e => {
        if (e.key === "Escape") {
          closeModal();
        }
        if (e.key === "ArrowRight") {
          nextPicture();
        }
        if (e.key === "ArrowLeft") {
          previousPicture();
        }
      }}
    >
      <button
        class="lightbox-button"
        @click=${previousPicture}
        aria-label="previous image"
      >
        <i class="fa fa-chevron-left"></i>
      </button>
      <figure class="image-container">
        ${medium.image &&
        render(
          Image({
            src: `../assets/images/photographers-pictures/huge/huge_${medium.image}`,
            placeholderSrc: `../assets/images/photographers-pictures/low-res/${medium.image}`,
            isLoaded,
            onLoad: () => setLoaded(true),
            className: "lightbox-image",
            dominantColor: medium.dominantColor,
            altText: medium.altText,
          })
        )}
        ${medium.video &&
        render(
          Video({
            video: medium.video,
            altText: medium.altText,
            className: "lightbox-image",
            dominantColor: medium.dominantColor,
          })
        )}
        <figcaption class="lightbox-medium-title">${medium.title}</figcaption>
      </figure>
      <button
        class="lightbox-button"
        @click=${nextPicture}
        aria-label="next image"
      >
        <i class="fa fa-chevron-right"></i>
      </button>
      <button
        id="close-lightbox-button"
        aria-label="close dialog"
        @click=${closeModal}
        class="lightbox-button"
      >
        <i class="fa fa-times"></i>
      </button>
    </section>
  </div>`;
};

export default template(LightboxModal);
