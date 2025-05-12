# 🧠 gemmit

> ✨ Generate smart, AI-powered Git commit messages using Gemini. One command, zero thinking.

---

## 🚀 What is Gemmit?

**Gemmit** is a lightweight CLI tool that uses **Google Gemini AI** to automatically generate meaningful Git commit messages based on your staged code changes. Whether you're fixing a typo or refactoring a feature, Gemmit turns your `git diff` into a polished commit.

---

## 📦 Installation

### ▶️ Quick one-time usage
```bash
npx gemmit -- "fix #42"
```

### 📌 Or install locally
```bash
npm install --save-dev gemmit
```

Add a script:
```json
"scripts": {
  "ai-commit": "gemmit"
}
```

Run with:
```bash
npm run ai-commit -- "fix #42"
```

---

## 🛠 Setup

Before running `gemmit`, create a config file in your project root:

```bash
cp node_modules/gemmit/config/config.example.sh ./ai-commit.config.sh
```

Then edit `ai-commit.config.sh` and add:

```bash
API_KEY="your-gemini-api-key"
MODEL_NAME="gemini-2.0-flash" # or gemini-2.0-pro
PYTHON_PATH="/your/python/path"
```

✅ That’s it — you're ready!

---

## ✏️ Usage

From a Git-tracked project:

```bash
npx gemmit -- "fix #123"
```

Or just:

```bash
npx gemmit
```

If you don’t pass a prefix, it just uses the AI output.

The AI will read your `git diff --cached`, send it to Gemini, and generate a commit like:

```
fix #123 Adjust null check in login validator
```

Gemmit combines this with your prefix and commits:
```bash
git commit -m "fix #123 Adjust null check in login validator"
git push
```

---

## 🔐 API Key Management

Gemmit supports **3 flexible config methods**:

1. **Config file**: `./ai-commit.config.sh` (preferred)
2. **Environment variables**:
   ```bash
   export GEMMIT_API_KEY="..."
   export GEMMIT_MODEL_NAME="gemini-2.0-flash"
   export GEMMIT_PYTHON_PATH="/usr/bin/python3"
   ```
3. **.env (optional)**:
   ```env
   GEMMIT_API_KEY=...
   ```

---

## 🧪 Example Workflow

```bash
git add .
npx gemmit -- "fix #56"
```

💬 Gemini reads your staged code changes and replies with:
```
Fix login validation for empty email
```

Gemmit combines this with your prefix and commits:
```
fix #56 Fix login validation for empty email
```

Then it runs:
```bash
git commit -m "fix #56 Fix login validation for empty email"
git push
```

---

## 📄 License

MIT © root4nishant

---

## 🧠 Powered by

- [Gemini API (Google AI)](https://ai.google.dev/)
- Bash scripting
