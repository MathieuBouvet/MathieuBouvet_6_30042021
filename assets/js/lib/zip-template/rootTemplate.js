/*
  Create a root template, wich is like an entry point for the library.
  Attach the result of rendering the template to the dom element specified in the parameters.
  Must also receive a store object
*/
export function createRootTemplate(node, template, store) {
  let listenersToRegister = [];

  const context = {
    read: store.read,
    write: store.write,
    render: renderTemplate,
  };

  function render() {
    const focusedElementRef = getFocusedElementRef(); // for preserving elements focus between renders
    const htmlString = renderTemplate(template);

    node.innerHTML = htmlString;

    focusElement(focusedElementRef); // for preserving elements focus between renders

    registerTemplatesEventListeners();
  }

  /*
    Call the template received (if it is a function), passing the context object down.
    This allow template functions to access the store and render other templates.
    
    A template that don't need access to the context can also be rendered.

    It also gathers the event listeners to set up, once the rendering to the dom is done.
  */
  function renderTemplate(template) {
    const [htmlString, listeners] =
      typeof template === "function" ? template(context) : template;
      listenersToRegister.push(...listeners);
    return htmlString;
  }

  function registerTemplatesEventListeners() {
    listenersToRegister.forEach(listener => {
      const node = document.querySelector(`[data-temp-ref-${listener.ref}`);
      node?.addEventListener(listener.eventName, listener.handler);
      node?.removeAttribute(`data-temp-ref-${listener.ref}`);
    });
    listenersToRegister = [];
  }

  function getFocusedElementRef() {
    const focusableElements = [...node.querySelectorAll("[data-focus-ref]")];
    const focusedElement = focusableElements.find(
      element => element === document.activeElement
    );

    return focusedElement
      ? focusedElement.getAttribute("data-focus-ref")
      : null;
  }

  function focusElement(focusRef) {
    const previouslyFocusedElement = node.querySelector(
      `[data-focus-ref="${focusRef}"`
    );
    if (previouslyFocusedElement == null) {
      return;
    }
    previouslyFocusedElement.focus();
    // handle cursor position on input and textarea elements
    if (isCursorControllable(previouslyFocusedElement)) {
      const end = previouslyFocusedElement.value.length;
      previouslyFocusedElement.setSelectionRange(end, end);
    } else if (previouslyFocusedElement.type === "number") {
      // cursor position for number inputs hack
      const previousValue = previouslyFocusedElement.value;
      previouslyFocusedElement.value = previousValue + 1;
      previouslyFocusedElement.value = previousValue;
    }
  }

  function isCursorControllable(element) {
    return (
      element.nodeName === "TEXTAREA" ||
      ["text", "search", "url", "tel", "password"].includes(element.type)
    );
  }

  store.subscribe({ render });
  render();
}
