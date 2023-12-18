import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import {
  convertSaeIntToStatutEnum,
  convertSaeStatutEnumToHText,
} from "../../src/utils/Utils";
import { SAEStatus } from "../../src/assets/enums/SAEStatus.enum";

let int_status: number;
let sae_status: SAEStatus;
let htext_status: string;

Given("the number given from the API is {int}", function (int) {
  int_status = int;
});

When("I convert the API status to a Frontend status", async function () {
  sae_status = convertSaeIntToStatutEnum(int_status);
});

Then("the Frontend status should be {string}", function (string) {
  expect(sae_status).to.be.equal(string);
});

Given("the Frontend status is {string}", function (string) {
  sae_status = string;
});

When(
  "I convert the Frontend status to a human readable text",
  async function () {
    htext_status = convertSaeStatutEnumToHText(sae_status);
  }
);

Then("the human readable text should be {string}", function (string) {
  expect(htext_status).to.be.equal(string);
});
