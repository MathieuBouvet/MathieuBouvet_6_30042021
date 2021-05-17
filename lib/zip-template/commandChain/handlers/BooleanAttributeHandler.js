import { BaseHandler } from "../BaseHandler.js";

export class BooleanAttributeHandler extends BaseHandler {
  handle(request) {
    const { attributeData } = request;

    attributeData.forEach(booleanAttribute => {
      const { node, name, value } = booleanAttribute;
      if (value) {
        node?.setAttribute(name, "");
      } else {
        node?.removeAttribute(name);
      }
      node[name] = value;
    });

    request.attributeData = [];
    return request;
  }
}
