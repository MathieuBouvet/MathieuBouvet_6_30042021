/*
  Create a store, that could be initialized with "initialData".
  The store is an Observer, and when modified, will notify all of its subscribers
  (typically root templates) and they will re-render
*/
export function createStore(initialData = {}) {
  const data = initialData;
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
    Provide access to the store, via a selector function that will receive the store data
    This is intended to be a read only operation, but it is not enforced by the library.
    It is discouraged though, because mutations ocurring in the function will not notify subscribers.
  */
  function read(selectorFn) {
    return selectorFn(data);
  }

  /*
    Provide access to mutate the store data, via a function that will receive the store data
    Will always notify the subscribers, even if no mutations where done.
  */
  function write(mutationFn) {
    mutationFn(data);
    _notifySubscribers();
  }

  return {
    read,
    write,
    subscribe,
    unsubscribe,
  };
}
