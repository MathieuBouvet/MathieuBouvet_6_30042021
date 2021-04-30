/* A simple generator function for generating numbers. Used internally. */
function* numberGenerator() {
  let i = 0;
  while (true) {
    if (i > 100_000) {
      i = 0;
    }
    yield i++;
  }
}

const autoIncrementer = numberGenerator();

const eventDirective = / @(\w*)=$/;
const booleanAttributeDirective = / :(\w*)=$/;
const focusRefDirective = / \$(\w*)/;

// handle expression formatting, preventing the rendering of "," between array elements
function formatExpression(expression, skip) {
  if (skip || expression == null) {
    return "";
  }
  return Array.isArray(expression) ? expression.join(" ") : expression;
}

/*
  Tagged template function.
  Parses the received strings to handle template directives and evaluates expressions.
  
  There are 3 supported template directives :
    @[eventName]=${[handler]} : for setting up an event listener. Registers [handler] to the [eventName] event
    :[booleanAttribute]=${[expression]} : ouputs [booleanAttribute] if [expression] evaluates to true, nothing otherwise
    $[refName] : a shortcut for keeping focus on element between renders, aka focus refs.
                 Simply adds an attribute to the element, data-focus-ref="[refName]"
                 [refName] must be unique for the root template to work properly

  The function returns the html string, and a list of object for setting up event listeners.
  The root template will handle rendering the string to the dom, and setting up the event listeners.
*/
export function html(strings, ...expressions) {
  const gatheredListeners = [];
  const htmlString = strings.reduce((result, currentString, i) => {
    let skipExpression = !expressions[i] && expressions[i] !== 0;

    currentString = currentString.replace(eventDirective, (_, eventName) => {
      const ref = autoIncrementer.next().value;
      skipExpression = true;
      gatheredListeners.push({ eventName, handler: expressions[i], ref });
      return ` data-temp-ref-${ref}`; // set up a reference for the event registration
    });

    currentString = currentString.replace(
      booleanAttributeDirective,
      (_, attributeName) => {
        skipExpression = true;
        return ` ${expressions[i] ? attributeName : ""}`;
      }
    );

    currentString = currentString.replace(focusRefDirective, (_, refName) => {
      return ` data-focus-ref="${refName}"`;
    });

    const expression = formatExpression(expressions?.[i], skipExpression);

    return `${result + currentString}${expression}`;
  }, "");

  return [htmlString, gatheredListeners];
}

/* Take a template function, and return a partial application of this function.
  This partial application will be called by the library, and will provide the "context" object,
  allowing its access in the template function definition.
  The context object provide access to the store, and a render function, for nesting templates.
*/
export function template(templateFn) {
  return props => context => templateFn(props, context);
}
