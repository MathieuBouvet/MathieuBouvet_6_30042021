import { DiffDOM } from "../diff-dom/index.js";
import { isCallable } from "./helpers/typeChecker.js";
/*
  Create a root template, wich is like an entry point for the library.
  Attach the result of rendering the template to the dom element specified in the parameters.
  Must also receive a store object
*/

export function createRootTemplate(node, template, store) {
  let listenersToRegister = [];
  let registeredListeners = [];
  let booleanAttributesToHandle = [];

  const context = {
    useStore: store.useStore,
    render: renderTemplate,
  };

  function render() {
    const domDiffer = new DiffDOM();
    const htmlString = renderTemplate(template);
    const newNode = new DOMParser().parseFromString(htmlString, "text/html");

    const diff = domDiffer.diff(node, newNode.body.firstChild);

    removeTemplatesEventListeners();

    domDiffer.apply(node, diff);

    handleBooleanAttributes();
    registerTemplatesEventListeners();
  }

  /*
    Call the template received (if it is a function), passing the context object down.
    This allow template functions to access the store and render other templates.
    
    A template that don't need access to the context can also be rendered.

    It also gathers the event listeners to set up, once the rendering to the dom is done.
  */
  function renderTemplate(template) {
    const [htmlString, listeners, booleansAttributes] = isCallable(template)
      ? template(context)
      : template;
    listenersToRegister.push(...listeners);
    booleanAttributesToHandle.push(...booleansAttributes);
    return htmlString;
  }

  function registerTemplatesEventListeners() {
    listenersToRegister.forEach(listener => {
      const node = document.querySelector(`[data-temp-ref-${listener.ref}`);
      node?.removeAttribute(`data-temp-ref-${listener.ref}`);
      if (node != null) {
        registerListener(node, listener.eventName, listener.handler);
      }
    });
    listenersToRegister = [];
  }

  function registerListener(node, eventName, handler) {
    node.addEventListener(eventName, handler);
    registeredListeners.push({
      node,
      eventName,
      handler,
    });
  }

  function removeTemplatesEventListeners() {
    registeredListeners.forEach(({ node, eventName, handler }) => {
      node.removeEventListener(eventName, handler);
    });
    registeredListeners = [];
  }

  function handleBooleanAttributes() {
    booleanAttributesToHandle.forEach(attribute => {
      const node = document.querySelector(`[data-temp-ref-${attribute.ref}`);
      node?.removeAttribute(`data-temp-ref-${attribute.ref}`);
      if (attribute.value) {
        node?.setAttribute(attribute.name, "");
      } else {
        node?.removeAttribute(attribute.name);
      }
      node[attribute.name] = attribute.value;
    });
    booleanAttributesToHandle = [];
  }

  store.subscribe({ render });
  render();
}
