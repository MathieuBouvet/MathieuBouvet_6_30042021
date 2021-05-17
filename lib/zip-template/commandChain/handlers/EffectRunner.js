import { BaseHandler } from "../BaseHandler.js";

export class EffectRunner extends BaseHandler {
  handle(request) {
    const { effectData } = request;

    const cleanUps = effectData.map(effect => effect());

    request.effectData = cleanUps;
    return request;
  }
}
