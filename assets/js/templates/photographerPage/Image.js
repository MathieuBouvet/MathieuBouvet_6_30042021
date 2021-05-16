import { html, template } from "../../lib/zip-template/index.js";

const Image = ({ id, title, image, likes, position }, context) => {
  return html`<figure class="photographer-medium">
    <img
      src="${`../assets/images/photographers-pictures/medium_${image}`}"
      alt=""
      class="${position !== "default" && position}"
    />
    <figcaption>
      <h2 class="medium-title">${title}</h2>

    </figcaption>
  </figure>`;
};

export default template(Image);
