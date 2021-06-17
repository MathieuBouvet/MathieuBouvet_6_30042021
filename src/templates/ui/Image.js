import { html, template } from "../../../lib/zip-template/index.js";

const Image = (
  { src, placeholderSrc, altText, isLoaded, onLoad, className, dominantColor },
  context
) => {
  const { render } = context;
  return html`<div class="image-container">
    <img
      src="${src}"
      alt="${altText}"
      class="full-res-image ${className} ${!isLoaded && "hidden"}"
      @load=${onLoad}
      style="background-color: ${dominantColor}"
    />
    <img
      aria-hidden="true"
      class="low-res-image ${isLoaded && "hidden"} ${className}"
      src="${placeholderSrc}"
      alt="${altText}"
      style="background-color: ${dominantColor}"
    />
    ${!isLoaded &&
    render(
      html`
        <div class="loader-container">
          <div class="loader"></div>
          <div class="sr-only">Chargement de l'image</div>
        </div>
      `
    )}
  </div> `;
};

export default template(Image);
