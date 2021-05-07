import { DiffDOM } from "../diff-dom/index.js";
import { isCallable } from "./helpers/typeChecker.js";
import {
  resolveRefToDomNode,
  removeListener,
  eraseTempRefAttribute,
  registerListener,
  handleBooleanAttribute,
} from "./helpers/rootTemplateHelpers.js";

/*
  Create a root template, wich is like an entry point for the library.
  Attach the result of rendering the template to the dom element specified in the parameters.
  Must also receive a store object
*/
export function createRootTemplate(node, template, store) {
  let listenersToRegister = [];
  let booleanAttributesToHandle = [];

  const context = {
    useStore: store.useStore,
    render: renderTemplate,
  };

  function render() {
    removeTemplatesEventListeners();

    const domDiffer = new DiffDOM();
    const htmlString = renderTemplate(template);
    const newNode = new DOMParser().parseFromString(htmlString, "text/html");

    const diff = domDiffer.diff(node, newNode.body.firstChild);

    domDiffer.apply(node, diff);

    handleBooleanAttributes();

    registerTemplatesEventListeners();
  }

  /*
    Call the template received (if it is a function), passing down the context object.
    This allow template functions to access the store and render other templates.
    
    A template that don't need access to the context can also be rendered.

    It also gathers the event listeners and the boolean attributes to set up.
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
    listenersToRegister = listenersToRegister
      .map(resolveRefToDomNode)
      .map(registerListener)
      .map(eraseTempRefAttribute);
  }

  function removeTemplatesEventListeners() {
    listenersToRegister.forEach(removeListener);
    listenersToRegister = [];
  }

  function handleBooleanAttributes() {
    booleanAttributesToHandle = booleanAttributesToHandle
      .map(resolveRefToDomNode)
      .map(handleBooleanAttribute)
      .map(eraseTempRefAttribute);

    booleanAttributesToHandle = [];
  }

  store.subscribe({ render });
  render();
}
