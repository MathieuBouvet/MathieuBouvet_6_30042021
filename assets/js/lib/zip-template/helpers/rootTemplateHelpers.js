export function resolveRefToDomNode(item) {
  const { ref } = item;
  const node = document.querySelector(`[data-temp-ref-${ref}]`);
  return {
    ...item,
    node,
  };
}

export function registerListener(item) {
  const { node, eventName, handler } = item;
  node?.addEventListener(eventName, handler);
  return item;
}

export function eraseTempRefAttribute(item) {
  item.node?.removeAttribute(`data-temp-ref-${item.ref}`);
  return item;
}

export function removeListener(item) {
  const { node, eventName, handler } = item;
  node?.removeEventListener(eventName, handler);
  return item;
}

export function handleBooleanAttribute(item) {
  const { node, name, value } = item;
  if (value) {
    node?.setAttribute(name, "");
  } else {
    node?.removeAttribute(name);
  }
  node[name] = value;
  return item;
}