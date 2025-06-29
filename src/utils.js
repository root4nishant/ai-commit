const { execSync } = require("child_process");

function getGitDiff() {
  try {
    const diff = execSync("git diff --cached", { encoding: "utf8" });
    return diff.trim();
  } catch (e) {
    return "";
  }
}

function getChangedFilesCount() {
  try {
    const output = execSync("git diff --cached --name-only", {
      encoding: "utf8",
    });
    return output.split("\n").filter(Boolean).length;
  } catch (e) {
    return 0;
  }
}

module.exports = { getGitDiff, getChangedFilesCount };
