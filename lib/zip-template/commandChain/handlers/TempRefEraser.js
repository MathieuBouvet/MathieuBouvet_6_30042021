import { BaseHandler } from "../BaseHandler.js";

export class TempRefEraser extends BaseHandler {
  handle(request) {
    const { eventData, attributeData } = request;

    const toErase = [...eventData, ...attributeData];
    toErase.forEach(item => {
      item.node?.removeAttribute(`data-temp-ref-${item.ref}`);
    });

    return request;
  }
}
