import { toImmutable } from "./helpers/immutable.js";
import {
  REF_SYMBOL,
  wrappedWithRef,
  unwrappedOfRefs,
} from "./helpers/reference.js";
import { isCallable } from "./helpers/typeChecker.js";

/*
  Create a store, that could be initialized with "initialData".
  The store is an Observer, and when modified, will notify all of its subscribers
  (typically root templates) and they will re-render
*/
export function createStore(initialData = {}) {
  let dataImmutable = toImmutable(initialData); // will block modification attempts, see useStore below for more details
  const dataReferences = wrappedWithRef(initialData); // all data are treated as references, allowing modification by reference. see useStore below for more details
  const subscribers = [];

  // subscribe a root template to store data mutations
  function subscribe(subscriber) {
    subscribers.push(subscriber);
  }

  // unsubscribe a root template
  function unsubscribe(subscriber) {
    subscribers = subscriber.filter(item => item !== subscriber);
  }

  function _notifySubscribers() {
    subscribers.forEach(subscriber => subscriber.render());
  }

  /*
    Provide access to the store.
    Take a selector function, which will receive the store data.
    This function must return the store property needed to be accessed.

    Provide access to the root of the store by default.
    
    A useStore call will return a tuple :

      1 - The read only value selected by the selector function. 
          It is a proxy that will block all modification attempts

      2 - The update function. It takes either the new value directly,
          or a function that will receive the selected value.
          It checks for strict equality between the previous and the new value,
          and trigger a new render appropriatly.
    
    There is a bit of convoluted logic involved to handle references to value, instead of "normal" values,
    but this allow for a simple API, with a selector function, describing exactly which part of the state
    is needed, and provide a simple way to update it

    example : 

      const [value, setValue] = useStore(store => store.myObj.value);

      console.log(value); // it prints the value
      setValue(42); // store.myObj.value is set to 42, which will probably trigger a new render

      
  */
  function useStore(selectorFn = store => store) {
    const storeValue = selectorFn(dataImmutable);

    const setStoreValue = value => {
      let target = selectorFn(dataReferences);
      const previousValue = target[REF_SYMBOL];

      const newValue = isCallable(value) ? value(storeValue) : value;

      target[REF_SYMBOL] = newValue;

      if (previousValue !== newValue) {
        dataImmutable = toImmutable(unwrappedOfRefs(dataReferences));
        _notifySubscribers();
      }
    };
    return [storeValue, setStoreValue];
  }

  return {
    useStore,
    subscribe,
    unsubscribe,
  };
}
