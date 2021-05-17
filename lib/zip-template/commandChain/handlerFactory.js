import { BaseHandler } from "./BaseHandler.js";
import { EventUnregisterer } from "./handlers/EventUnregisterer.js";
import { TempRefResolver } from "./handlers/TempRefResolver.js";
import { EventRegisterer } from "./handlers/EventRegisterer.js";
import { BooleanAttributeHandler } from "./handlers/BooleanAttributeHandler.js";
import { TempRefEraser } from "./handlers/TempRefEraser.js";
import { EffectRunner } from "./handlers/EffectRunner.js";
import { EffectCleaner } from "./handlers/EffectCleaner.js";

const handlerNameMapping = {
  eventUnregisterer: EventUnregisterer,
  tempRefResolver: TempRefResolver,
  eventRegisterer: EventRegisterer,
  booleanAttributeHandler: BooleanAttributeHandler,
  tempRefEraser: TempRefEraser,
  effectRunner: EffectRunner,
  effectCleaner: EffectCleaner,
};

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
