const axios = require("axios");
const { getConfig, setConfig } = require("./config");
const { githubDeviceLogin } = require("./auth");
const open = require("open");

const BACKEND_URL = process.env.GEMMIT_API || "http://localhost:4000";

async function ensureAuthenticated() {
  let token = getConfig("token");
  if (!token) {
    token = await githubDeviceLogin();
  }
  try {
    await axios.get(`${BACKEND_URL}/auth/me`, {
      headers: { Authorization: token },
    });
  } catch {
    token = await githubDeviceLogin();
  }
}

async function getCredits() {
  const token = getConfig("token");
  const { data } = await axios.get(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: token },
  });
  return data.credits;
}

async function generateCommitMessage(diff, numFiles) {
  const token = getConfig("token");
  const { data } = await axios.post(
    `${BACKEND_URL}/api/commit/generate`,
    { diff, numFiles },
    { headers: { Authorization: token } }
  );
  if (data.credits <= 0) {
    console.log("Insufficient credits! Please purchase more via CLI.");
    return null;
  }
  return data.message;
}

async function buyCredits() {
  const token = getConfig("token");
  const { data } = await axios.post(
    `${BACKEND_URL}/api/payment/create`,
    { amount: 100 }, // INR, or set as desired
    { headers: { Authorization: token } }
  );
  console.log("Opening payment link...");
  await open(
    `https://checkout.razorpay.com/v1/checkout.js?order_id=${data.orderId}&key_id=${data.keyId}`
  );
  console.log("After payment, re-run gemmit to check new credits.");
}

module.exports = {
  generateCommitMessage,
  ensureAuthenticated,
  getCredits,
  buyCredits,
};
