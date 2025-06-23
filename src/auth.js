const open = require("open");
const axios = require("axios");
const { setConfig } = require("./config");
const BACKEND_URL = process.env.GEMMIT_API || "http://localhost:4000";

async function githubDeviceLogin() {
  // For demo: open GitHub login, get token from /auth/github/callback
  // Real: Use device flow or provide instructions for user
  const url = `${BACKEND_URL}/auth/github`;
  console.log(`Opening browser for GitHub login at: ${url}`);
  await open(url);
  const { token } = await waitForToken();
  setConfig("token", token);
  return token;
}

async function waitForToken() {
  // For demo: prompt user to paste token from backend,
  // or poll a /auth/pending endpoint if you implement it
  const inquirer = require("inquirer");
  const { token } = await inquirer.prompt([
    {
      type: "input",
      name: "token",
      message: "Paste the token you received after logging in:",
    },
  ]);
  return { token };
}

module.exports = { githubDeviceLogin };
