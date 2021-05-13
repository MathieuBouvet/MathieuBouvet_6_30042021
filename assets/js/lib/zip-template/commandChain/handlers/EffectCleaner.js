import { BaseHandler } from "../BaseHandler.js";
import { isCallable } from "../../helpers/typeChecker.js";

export class EffectCleaner extends BaseHandler {
  handle(request) {
    const { effectData } = request;
    effectData.forEach(clean => {
      isCallable(clean) && clean();
    });
    request.effectData = [];
    return request;
  }
}
