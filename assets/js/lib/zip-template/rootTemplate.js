import { DiffDOM } from "../diff-dom/index.js";
import { isCallable } from "./helpers/typeChecker.js";
import { createCommandChain } from "./commandChain/index.js";

/*
  Create a root template, wich is like an entry point for the library.
  Attach the result of rendering the template to the dom element specified in the parameters.
  Must also receive a store object
*/
export function createRootTemplate(node, template, store) {
  const beforeRender = createCommandChain("effectCleaner", "eventUnregisterer");
  const afterRender = createCommandChain(
    "tempRefResolver",
    "booleanAttributeHandler",
    "eventRegisterer",
    "effectRunner",
    "tempRefEraser"
  );

  let renderData = {
    eventData: [],
    attributeData: [],
    effectData: [],
  };

  const context = {
    useStore: store.useStore,
    render: renderTemplate,
    use: provideContext,
    useEffect: registerEffect,
  };

  function render() {
    renderData = beforeRender(renderData);

    const domDiffer = new DiffDOM();
    const htmlString = renderTemplate(template);
    const newNode = new DOMParser().parseFromString(htmlString, "text/html");

    const diff = domDiffer.diff(node, newNode.body.firstChild);
    domDiffer.apply(node, diff);

    renderData = afterRender(renderData);
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
    renderData.eventData.push(...listeners);
    renderData.attributeData.push(...booleansAttributes);
    return htmlString;
  }

  /*
    Used to provide the context to a function, usefull for custom hooks
  */
  function provideContext(customHookFn) {
    return customHookFn(context);
  }

  function registerEffect(effectFn){
    renderData.effectData.push(effectFn);
  }

  store.subscribe({ render });
  render();
}
