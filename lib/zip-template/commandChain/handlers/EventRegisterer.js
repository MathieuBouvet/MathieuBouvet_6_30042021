import { BaseHandler } from "../BaseHandler.js";

export class EventRegisterer extends BaseHandler {
  handle(request) {
    const { eventData } = request;
    
    eventData.forEach(eventData => {
      const { node, eventName, handler } = eventData;
      node?.addEventListener(eventName, handler);
    });

    return request;
  }
}
