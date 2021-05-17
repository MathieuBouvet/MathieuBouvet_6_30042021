/* Take a function, and return a partial application of this function.
  This partial application will be called by the library, and will provide the "context" object,
  allowing its access in the function definition.
  The context object provide access to the store, and a render function, for nesting templates.
*/
export function contextProvider(fn) {
  return (...args) => context => fn(...args, context);
}