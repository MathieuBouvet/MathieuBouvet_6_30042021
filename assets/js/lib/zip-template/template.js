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
  
  There are 2 supported template directives :
    @[eventName]=${[handler]} : 
      for setting up an event listener. Registers [handler] to the [eventName] event

    :[booleanAttribute]=${[expression]} :
      ouputs [booleanAttribute] if [expression] evaluates to true, nothing otherwise
    
  The function returns the html string, and a list of object for setting up event listeners.
  The root template will handle rendering the string to the dom, and setting up the event listeners.
*/
export function html(strings, ...expressions) {
  const gatheredListeners = [];
  const gatheredBooleans = [];
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
      (_, name) => {
        const ref = autoIncrementer.next().value;
        skipExpression = true;
        gatheredBooleans.push({ name, ref, value: expressions[i] });
        return ` data-temp-ref-${ref}`;
      }
    );

    const expression = formatExpression(expressions?.[i], skipExpression);

    return `${result + currentString}${expression}`;
  }, "");

  return [htmlString, gatheredListeners, gatheredBooleans];
}

/* Take a template function, and return a partial application of this function.
  This partial application will be called by the library, and will provide the "context" object,
  allowing its access in the template function definition.
  The context object provide access to the store, and a render function, for nesting templates.
*/
export function template(templateFn) {
  return (...args) => context => templateFn(...args, context);
}
