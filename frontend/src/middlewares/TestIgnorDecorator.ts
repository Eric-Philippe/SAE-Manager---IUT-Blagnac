import { Component } from "react";

function IgnoreTests<T extends { new (...args: any[]): Component }>(
  constructor: T
) {}

export default IgnoreTests;
