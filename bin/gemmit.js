#!/usr/bin/env node

const {
  generateCommitMessage,
  ensureAuthenticated,
  getCredits,
  buyCredits,
} = require("../src/api");
const { getGitDiff, getChangedFilesCount } = require("../src/utils");
const inquirer = require("inquirer");

(async () => {
  try {
    await ensureAuthenticated();
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
      execSync(`git commit -am "${commitMsg}"`);
      execSync("git push");
      console.log("Pushed, Done!");
    }
  } catch (e) {
    console.error("[Gemmit] Error:", e.message);
    process.exit(1);
  }
})();
