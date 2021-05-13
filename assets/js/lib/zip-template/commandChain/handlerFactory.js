import { BaseHandler } from "./BaseHandler.js";

const handlerNameMapping = {};

export function createHandler(name) {
  const SelectedHandler = handlerNameMapping[name];
  if (SelectedHandler == null) {
    console.warn(
      `No handler found for name "${name}", a pass-through handler was created instead`
    );
    return new BaseHandler();
  }
  return new SelectedHandler();
}
