import { isPrimitiveOrFunction } from "./typeChecker.js";

export const REF_SYMBOL = Symbol();

/*
  Create an object acting like a reference.
  example : createRef(42) will return 
  {
    *REF_SYMBOL: 42
  }

  The value is wrapped inside an object, and a mutation to that object will be available to other objects
  owning a reference to it.

  It uses a proxy to allow manipulating a reference almost as if it was its wrappee object.

  The sole purpose of all this, is to allow a very simple API to access the global store.
  
*/
function createRef(any) {
  const baseRef = {
    [REF_SYMBOL]: any,
  };
  return new Proxy(baseRef, {
    get(target, name) {
      if (name === REF_SYMBOL) {
        return target[REF_SYMBOL];
      }
      return target[REF_SYMBOL][name];
    },
    set(target, name, value) {
      const valueToRef = wrappedWithRef(value);
      target[REF_SYMBOL] = valueToRef[REF_SYMBOL];
      return true;
    },
  });
}

/*
  Will recursively create an object with its value treated as references, wich will allow mutation by references.
  It is intended to only be used by the store internally.
*/
export function wrappedWithRef(any) {
  if (isPrimitiveOrFunction(any)) {
    return createRef(any);
  }
  if (Array.isArray(any)) {
    return createRef(any.map(wrappedWithRef));
  }
  const propertiesWrapped = Object.entries(any).reduce(
    (wrapped, [key, value]) => {
      wrapped[key] = wrappedWithRef(value);
      return wrapped;
    },
    {}
  );
  return createRef(propertiesWrapped);
}

/*
  Will recursively create an object removing the references mechanism.
  It is intended to only be used by the store internally.
*/
export function unwrappedOfRefs(any) {
  const wrappee = any[REF_SYMBOL];

  if (isPrimitiveOrFunction(wrappee)) {
    return wrappee;
  }
  if (Array.isArray(wrappee)) {
    return wrappee.map(unwrappedOfRefs);
  }
  return Object.entries(wrappee).reduce((acc, [key, value]) => {
    acc[key] = unwrappedOfRefs(value);
    return acc;
  }, {});
}
