import { register } from 'component-register';
import { h, render } from 'preact';

function withPreact(Component) {
  return (props, { element }) => {
    let mountEl = element.renderRoot(),
      preactRoot = render(h(Component, props), mountEl);

    element.addReleaseCallback(() => render('', mountEl, preactRoot));

    element.addPropertyChangedCallback((name, value) => {
      props[name] = value;
      preactRoot = render(h(Component, props), mountEl, preactRoot);
    });
  };
}

function customElement(tag, props, ComponentType) {
  if (arguments.length === 2) {
    ComponentType = props;
    props = {};
  }
  return register(tag, props)(withPreact(ComponentType));
}

export { customElement, withPreact }