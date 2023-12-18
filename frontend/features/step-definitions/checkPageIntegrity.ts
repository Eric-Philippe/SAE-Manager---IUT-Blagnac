import { exec } from "child_process";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

let command: string;
let exitCode: number = 0;

Given("all the app pages in the pages folder", async function () {
  command = "bash ./scripts/checkPageIntegrity.sh";
});

When(
  "I check that all the pages contains the basics components BlankLayout, Header, Footer",
  async function () {
    // Utilise une promesse pour attendre la fin de l'exécution de la commande
    const runTestsPromise = new Promise<void>((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          exitCode = 1;
          console.error(`Erreur d'exécution : ${error}`);
        } else {
          console.log(`Sortie standard : ${stdout}`);
          console.error(`Sortie d'erreur : ${stderr}`);
        }
        // Indique que l'exécution est terminée
        resolve();
      });
    });

    // Attend que la promesse se résolve avant de passer à l'étape suivante
    await runTestsPromise;
  }
);

Then("all the pages should pass the test", async function () {
  // Utilise expect après avoir attendu que la promesse se résolve
  expect(exitCode).to.be.equal(0);
});
