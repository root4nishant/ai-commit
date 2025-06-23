const os = require("os");
const path = require("path");
const fs = require("fs");

const CONFIG_PATH = path.join(os.homedir(), ".gemmit.json");

function getConfig(key) {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  return config[key];
}

function setConfig(key, value) {
  let config = {};
  if (fs.existsSync(CONFIG_PATH))
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  config[key] = value;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

module.exports = { getConfig, setConfig };
