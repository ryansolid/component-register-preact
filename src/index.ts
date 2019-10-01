import { register, ComponentType, Props, ComponentOptions } from 'component-register';
import { h, render, ComponentType as PreactComponentType } from 'preact';
import { PropsDefinition } from 'component-register/types/utils';

function withPreact(Component: PreactComponentType): ComponentType {
  return (props: Props, { element }: ComponentOptions) => {
    let mountEl = element.renderRoot(),
      preactRoot = render(h(Component, props), mountEl);

    element.addReleaseCallback(() => render('', mountEl, preactRoot as any));

    element.addPropertyChangedCallback((name: string, value: any) => {
      props[name] = value;
      preactRoot = render(h(Component, props), mountEl, preactRoot as any);
    });
  };
}

function customElement(tag: string, ComponentType: ComponentType): (ComponentType: ComponentType) => any
function customElement(tag: string, props: PropsDefinition, ComponentType: ComponentType): (ComponentType: ComponentType) => any
function customElement(tag: string, props: any, ComponentType?: any): (ComponentType: ComponentType) => any {
  if (arguments.length === 2) {
    ComponentType = props;
    props = {};
  }
  return register(tag, props)(withPreact(ComponentType));
}

export { customElement, withPreact }