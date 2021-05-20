export function getTagsFromUrl() {
  return getHashParams(window.location)?.tags ?? [];
}

export function getHashParams(url) {
  return new URL(url).hash
    .slice(1) // get the hash part of the url, without the starting '#' character
    .split("&")
    .reduce((parsed, param) => {
      if (param !== "") {
        const [key, stringValues] = param.split(":");
        parsed[key] = stringValues?.split(",") ?? [];
      }
      return parsed;
    }, {});
}

export function getHashString(hashParams) {
  return Object.entries(hashParams)
    .reduce((acc, [key, values]) => {
      const stringValues = values.join(",");
      const parameter =
        stringValues !== "" ? [key, stringValues].join(":") : key;
      acc.push(parameter);
      return acc;
    }, [])
    .join("&");
}
