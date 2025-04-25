# ITR: Next.js 15 Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-20.x-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/next.js-15-blue)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4-blue)](https://tailwindcss.com/)

---

## 🚀 Project Overview

A modern, scalable Next.js 15 app using TypeScript, Tailwind CSS, ESLint, Prettier, Husky, and Docker. Supports environment-based configuration and CI-friendly code quality checks.

---

## 📦 Features
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- ESLint & Prettier (with Husky pre-commit)
- Lint-staged for fast checks
- Multi-env support via dotenv
- Docker & docker-compose ready

---

## 🛠️ Getting Started

### Development
```bash
npm install
npm run dev
```

### Lint & Format
```bash
npm run lint         # Lint code
npm run format       # Format code
```

### Environment Files
- `.env` (shared)
- `.env.development`, `.env.qa`, `.env.uat` (per environment)

---

## 🐳 Docker
```bash
docker-compose up --build
```

---

## 🤝 Contributing
PRs welcome! Please follow code style and run pre-commit checks.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
