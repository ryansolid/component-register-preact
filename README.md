# Component Register Preact

This is a [Component Register](https://github.com/ryansolid/component-register) HOC (decorator/mixin) to support Preact Components. Component props are passed through as Preact props.

```jsx
import { register, compose } from 'component-register'
import { customElement } from 'component-register-preact'
import { Component }  from 'preact'

// Normal Preact Component
class MyComponent extends Component {
  constructor(props) {
    this.state = {greeting: 'Hello'}
  }

  render() {
    return <div>{this.state.greeting + ' ' + this.props.recipient}</div>
  }
}

customElement('my-component', {recipient: 'John'}, MyComponent)
```

This library also supports Stateless pure function components.