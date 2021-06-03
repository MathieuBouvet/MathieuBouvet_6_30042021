import { html, template } from "../../../lib/zip-template/index.js";

const Image = ({
  src,
  placeholderSrc,
  altText,
  isLoaded,
  onLoad,
  className,
}) => {
  return html`<div class="image-container">
    <img
      src="${src}"
      alt="${altText}"
      class="full-res-image ${className}"
      @load=${onLoad}
    />
    <img
      aria-hidden="true"
      class="low-res-image ${isLoaded && "hidden"} ${className}"
      src="${placeholderSrc}"
      alt="${altText}"
    />
  </div> `;
};

export default template(Image);
