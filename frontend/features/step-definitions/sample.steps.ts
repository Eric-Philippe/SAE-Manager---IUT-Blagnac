import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { getCurrentYear } from "../../src/utils/Utils";

let year: number;

Given("The usage of the Copyright Component", async function () {
  console.log("Rendering Copyright");
});

When("I display the year of the copyright", async function () {
  year = getCurrentYear();
});

Then("The year should be the current year", async function () {
  expect(year).to.be.equal(new Date().getFullYear());
});
