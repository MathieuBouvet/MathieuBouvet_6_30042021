import { BaseHandler } from "../BaseHandler.js";

function resolveRefToDomNode(item) {
  const { ref } = item;
  const node = document.querySelector(`[data-temp-ref-${ref}]`);
  return {
    ...item,
    node,
  };
}

export class TempRefResolver extends BaseHandler {
  handle(request) {
    const { eventData, attributeData } = request;

    request.eventData = eventData.map(resolveRefToDomNode);
    request.attributeData = attributeData.map(resolveRefToDomNode);

    return request;
  }
}
