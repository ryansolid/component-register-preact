import { h, render } from 'preact';

export default (Component) =>
  ({ element, props }) => {
    let mountEl = element.renderRoot(),
      preactRoot = render(h(Component, props), mountEl);

    element.addReleaseCallback(() => render('', mountEl, preactRoot));

    element.addPropertyChangedCallback((name, value) => {
      props[name] = value;
      preactRoot = render(h(Component, props), mountEl, preactRoot);
    });
  };