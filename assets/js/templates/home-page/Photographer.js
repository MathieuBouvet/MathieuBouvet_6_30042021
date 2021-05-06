import { html, template } from "../../lib/zip-template/index.js";

const Photographer = template(
  ({ id, name, portrait, city, tagline, price, tags, country }, { render }) => {
    return html`
      <section>
        <a href="pages/photographer?id=${id}" aria-label="${name}">
          <figure>
            <img src="assets/images/photographers/${portrait}" alt="" class="photographer-portrait"/>
            <figcaption><h2>${name}</h2></figcaption>
          </figure>
        </a>
        <p>
          <span>${city}, ${country}</span><span>${tagline}</span><span>${price}€/jour</span>
        </p>
        <ul>
          ${tags.map(tag => render(html`<li>#${tag}</li>`))}
        </ul>
      </section>
    `;
  }
);

export default Photographer;
