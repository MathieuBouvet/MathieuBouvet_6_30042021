import { BaseHandler } from "../BaseHandler.js";

export class EventUnregisterer extends BaseHandler {
  handle(request) {
    const { eventData } = request;
    eventData.forEach(event => {
      const { node, eventName, handler } = event;
      node?.removeEventListener(eventName, handler);
    });
    request.eventData = [];
    return request;
  }
}
