import { html, template } from "../../../lib/zip-template/index.js";

const Image = ({ image, position }) => {
  return html`<img
    src="${`../assets/images/photographers-pictures/medium_${image}`}"
    alt=""
    class="medium ${position !== "default" && position}"
  />`;
};

export default template(Image);
