export function isPrimitiveOrFunction(any) {
  return typeof any !== "object" || any === null;
}

export function isCallable(any) {
  return typeof any === "function";
}
