import { html, template } from "../../../lib/zip-template/index.js";

const ContactModal = ({ photographerName }, context) => {
  const { useStore, useEffect } = context;
  const [_, setOpen] = useStore(store => store.contactModal.isOpened);
  const [isClosing, setIsClosing] = useStore(
    store => store.contactModal.isClosing
  );

  const closeModale = () => setIsClosing(true);

  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    closeModale();
  };

  const closingModalFinished = e => {
    if (e.animationName === "disappear") {
      setOpen(false);
      setIsClosing(false);
    }
  };

  useEffect(() => {
    document.getElementById("contact-form-modal").focus();
  });

  return html`<div
    class="modal-container ${isClosing && "fade"}"
    role="dialog"
    aria-labelledby="contact-form-title"
    @click=${e => {
      if (e.target === e.currentTarget) {
        closeModale();
      }
    }}
  >
    <section
      class="modal-content ${isClosing && "closing"}"
      @animationend=${closingModalFinished}
      @keyup=${e => {
        if (e.key === "Escape") {
          closeModale();
        }
      }}
      id="contact-form-modal"
      tabindex="0"
    >
      <h2 id="contact-form-title">Contactez-moi ${photographerName}</h2>
      <form id="contact-form" action="" @submit=${onSubmit}>
        <div class="field-group">
          <label for="first-name">Prénom</label>
          <input id="first-name" name="firstName" type="text" class="field" />
        </div>
        <div class="field-group">
          <label for="last-name">Nom</label>
          <input id="last-name" name="lastName" type="text" class="field" />
        </div>
        <div class="field-group">
          <label for="e-mail">Email</label>
          <input id="e-mail" name="email" type="email" class="field" />
        </div>
        <div class="field-group">
          <label for="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            class="field textarea-field"
          ></textarea>
        </div>
        <div class="field-group">
          <button type="submit" class="main-button submit-contact-form-button">
            Envoyer
          </button>
        </div>
      </form>
      <button
        class="close-contact-form-button"
        aria-label="close dialog"
        @click=${closeModale}
      >
        <i class="fa fa-times"></i>
      </button>
    </section>
  </div>`;
};

export default template(ContactModal);
