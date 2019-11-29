import {
  register,
  getCurrentElement,
  ComponentType,
  ComponentOptions,
  PropsDefinitionInput
} from "component-register";
import { h, render, ComponentType as PreactComponentType } from "preact";
import { useMemo } from "preact/hooks";

function withPreact<T>(Component: PreactComponentType): ComponentType<T> {
  return (props: T, { element }: ComponentOptions) => {
    let mountEl = element.renderRoot(),
      preactRoot = render(h(Component, props), mountEl);

    element.addReleaseCallback(() => render("", mountEl, preactRoot as any));

    element.addPropertyChangedCallback((name: string, value: any) => {
      props[name as keyof T] = value;
      preactRoot = render(h(Component, props), mountEl, preactRoot as any);
    });
  };
}

function customElement<T>(
  tag: string,
  ComponentType: ComponentType<T>
): (ComponentType: ComponentType<T>) => any;
function customElement<T>(
  tag: string,
  props: PropsDefinitionInput<T>,
  ComponentType: ComponentType<T>
): (ComponentType: ComponentType<T>) => any;
function customElement<T>(
  tag: string,
  props: any,
  ComponentType?: any
): (ComponentType: ComponentType<T>) => any {
  if (arguments.length === 2) {
    ComponentType = props;
    props = {};
  }
  return register<T>(
    tag,
    props as PropsDefinitionInput<T>
  )(withPreact(ComponentType));
}

function useHostElement(): HTMLElement {
  const el = getCurrentElement();
  return useMemo(() => el, []);
}

export { customElement, withPreact, useHostElement };
