import { BaseHandler } from "../BaseHandler.js";

export class EffectCleaner extends BaseHandler {
  handle(request) {
    const { effectData } = request;
    effectData.forEach(clean => clean());
    request.effectData = [];
    return request;
  }
}
