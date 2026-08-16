import React from "react";

/*
Step 1:
The original JavaScript component receives a prop called `name`
without defining its type.

In TypeScript, we create an interface describing the props expected
by the component. Here, `name` must be a string.
*/
interface GreetingProps {
  name: string;
}

/*
Step 2:
We destructure `name` from the props object and apply the
GreetingProps interface to the function parameter.

This allows TypeScript to verify that Greeting is always used with
a valid string value for `name`.
*/
const Greeting = ({ name }: GreetingProps) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
