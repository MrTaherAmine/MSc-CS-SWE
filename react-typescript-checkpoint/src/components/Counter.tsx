import React, { Component } from "react";

/*
Step 1:
The original JavaScript class component stores `count` in state.

In TypeScript, we define an interface describing the shape of the
component state. `count` is a number.
*/
interface CounterState {
  count: number;
}

/*
Step 2:
This component does not receive any props, so we define an empty
props interface. This keeps the class declaration explicit.
*/
interface CounterProps {}

/*
Step 3:
React.Component accepts generic type arguments in this order:

Component<Props, State>

The component is therefore declared as:
Component<CounterProps, CounterState>
*/
class Counter extends Component<CounterProps, CounterState> {
  /*
  Step 4:
  The state property is explicitly typed using CounterState.
  */
  state: CounterState = {
    count: 0
  };

  /*
  Step 5:
  The increment method does not accept arguments and does not return
  a value, so its return type is `void`.

  setState updates `count` while TypeScript ensures it remains a number.
  */
  increment = (): void => {
    this.setState({
      count: this.state.count + 1
    });
  };

  /*
  Step 6:
  The render method returns JSX.
  React.ReactNode is a suitable return type for rendered React content.
  */
  render(): React.ReactNode {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
