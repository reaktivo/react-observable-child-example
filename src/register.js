import React from "react";
const cache = new WeakMap();

const Lazy = React.lazy(() => new Promise(() => {}));

const INIT = {};

const ObservableComponent = ({ value }) => {
  const [state, setState] = React.useState(INIT);
  React.useEffect(() => {
    const subscription = value.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [value, setState]);
  return state === INIT ? <Lazy /> : state;
};

const PromiseComponent = ({ value }) => {
  const [state, setState] = React.useState(INIT);
  React.useEffect(() => {
    value.then(setState);
  }, [value, setState]);
  return state === INIT ? <Lazy /> : state;
};

const mappers = [
  [child => typeof child.then === "function", PromiseComponent],
  [child => typeof child.subscribe === "function", ObservableComponent]
];

function childMapper(child) {
  const [, Component] = mappers.find(([predicate]) => predicate(child)) || [];
  if (Component) {
    if (cache.has(child)) {
      return cache.get(child);
    }
    const cachedChild = <Component value={child} />;
    cache.set(child, cachedChild);
    return cachedChild;
  }

  return child;
}

const { createElement } = React;
React.createElement = (type, props, ...children) => {
  return createElement(type, props, ...children.map(childMapper));
};
