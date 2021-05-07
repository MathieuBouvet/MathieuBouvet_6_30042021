import { isPrimitiveOrFunction } from "./typeChecker.js";

function denyAccess(type) {
  return (_, name) => {
    console.warn(
      `Cannot ${type} property "${name}" : the store is not directly mutable`
    );
    return true;
  };
}

const immutablilityTraps = {
  get(target, name) {
    return toImmutable(target[name]);
  },
  set: denyAccess("set"),
  deleteProperty: denyAccess("delete"),
};


/*
  Return a proxy that will block mutation attempts, acting like a deeply immutable object,
  with no need for deeply freezing that object
*/
function toImmutable(any) {
  if (isPrimitiveOrFunction(any)) {
    return any;
  }
  return new Proxy(any, immutablilityTraps);
}

export { toImmutable };
