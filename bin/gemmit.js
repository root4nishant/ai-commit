#!/usr/bin/env node

const {
  generateCommitMessage,
  ensureAuthenticated,
  getCredits,
  buyCredits,
} = require("../src/api");
const { getGitDiff, getChangedFilesCount } = require("../src/utils");
const inquirer = require("inquirer");

const command = process.argv[2];

(async () => {
  try {
    await ensureAuthenticated();
    if (command === "buy") {
      await buyCredits();
      process.exit(0);
    }
    if (command === "credits") {
      const credits = await getCredits();
      console.log(`You have ${credits} credits.`);
      process.exit(0);
    }
    const { execSync } = require("child_process");
    execSync("git add .");
    console.log("Checking for changes...");
    const diff = await getGitDiff();
    if (!diff) {
      console.log("No changes to commit.");
      process.exit(0);
    }
    const numFiles = await getChangedFilesCount();
    let credits = await getCredits();
    if (credits < numFiles * 2) {
      const { buy } = await inquirer.default.prompt([
        {
          type: "confirm",
          name: "buy",
          message: "Insufficient credits. Buy more?",
          default: true,
        },
      ]);
      if (buy) await buyCredits();
      else process.exit(0);
    }
    const commitMsg = await generateCommitMessage(diff, numFiles);
    if (commitMsg) {
      const { execSync } = require("child_process");
      console.log("Committing...");
      execSync(`git commit -m "${commitMsg}"`);
      console.log("Pushing...");
      execSync("git push");
      console.log("Commit message generated and pushed successfully!");
      console.log(`Commit message: "${commitMsg}"`);
      console.log("Pushed, Done!");
    }
  } catch (e) {
    console.error("[Gemmit] Error:", e.message);
    process.exit(1);
  }
})();
