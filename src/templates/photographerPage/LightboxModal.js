import { html, template } from "../../../lib/zip-template/index.js";
import matchingMedia from "../../hooks/matchingMedia.js";
import Image from "../ui/Image.js";

const LightboxModal = context => {
  const { useEffect, useStore, use, render } = context;

  const media = use(matchingMedia());

  const [_, setOpened] = useStore(store => store.lightbox.isOpened);
  const [isClosing, setClosing] = useStore(store => store.lightbox.isClosing);
  const [isLoaded, setLoaded] = useStore(store => store.lightbox.pictureLoaded);

  const [mediumId, setMediumId] = useStore(store => store.lightbox.mediumId);

  const [medium] = useStore(store => store.media[mediumId]);

  const mediumIndex = media.findIndex(medium => medium.id === mediumId);

  const nextMediaId = media[(mediumIndex + 1) % media.length].id;
  const previousMediaId =
    media[(mediumIndex + media.length - 1) % media.length].id;

  useEffect(() => {
    document.getElementById("lightbox-modal").focus();
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
    setLoaded(false);
    setMediumId(nextMediaId);
  };

  const previousPicture = () => {
    setLoaded(false);
    setMediumId(previousMediaId);
  };

  return html`<aside
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
      tabindex="0"
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
      <div class="lightbox-content-wrapper">
        <button class="lightbox-button" @click=${previousPicture}>
          <i class="fa fa-chevron-left"></i>
        </button>
        <figure>
          ${medium.image &&
          render(
            Image({
              src: `../assets/images/photographers-pictures/huge/huge_${medium.image}`,
              placeholderSrc: `../assets/images/photographers-pictures/low-res/${medium.image}`,
              isLoaded,
              onLoad: () => setLoaded(true),
              className: "lightbox-image",
              dominantColor: medium.dominantColor,
            })
          )}
          <figcaption class="lightbox-medium-title">${medium.title}</figcaption>
        </figure>
        <button class="lightbox-button" @click=${nextPicture}>
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
      <button
        aria-label="close dialog"
        @click=${closeModal}
        class="lightbox-button"
      >
        <i class="fa fa-times"></i>
      </button>
    </section>
  </aside>`;
};

export default template(LightboxModal);
