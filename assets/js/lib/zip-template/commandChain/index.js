import { createHandler } from "./handlerFactory.js";

function setNext(handler, i, handlers) {
  handler.setNext(handlers[i + 1]);
}

/*
  Create a command chain from the handler names given.
  Return a function that allows for executing the command chain.
*/
export function createCommandChain(...args) {
  if (args.length === 0) {
    args.push("");
  }
  const handlers = args.map(name => createHandler(name));
  handlers.forEach(setNext);

  return request => handlers[0].execute(request);
}
