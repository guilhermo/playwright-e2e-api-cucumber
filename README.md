# Playwright - E2E & API Automation + Cucumber

Automation project for the **Automation Exercise** platform, covering end-to-end (E2E) flows and service validations (API).

---

## Overview
This framework was built to simulate a real production scenario, with a focus on resilience, performance, and clarity. It integrates **API**, **Desktop UI**, and **Mobile Emulation** tests in a single CI/CD pipeline.

### Test Status
The suite currently holds **23 scenarios**:
* **API**: 7 contract, SLA, and functional tests.
* **E2E Desktop**: 8 login and checkout flow scenarios.
* **E2E Mobile (Pixel 7)**: 8 critical-flow scenarios in a mobile environment.

---

## Architecture and Folder Structure
The project uses the **Page Object Model (POM)** pattern for the UI and **Request Objects** for the API.

```text
.
├── .github/workflows/    # CI/CD configuration (GitHub Actions)
├── tests/
│   ├── api/              # API test layer (BDD)
│   │   ├── features/     # Gherkin scenarios
│   │   ├── requests/     # HTTP request logic
│   │   └── steps/        # Test step implementations
│   ├── e2e/              # UI test layer (BDD)
│   │   ├── features/     # Login and Checkout scenarios
│   │   └── steps/        # Test step implementations
│   └── support/          # Page Objects and Global Fixtures
├── playwright.config.ts  # Global framework configuration
└── package.json          # Script and dependency management
```
## Technologies and Versions
* Node.js: v20+ (LTS recommended)
* Playwright: ^1.58.2
* Playwright-BDD: ^8.4.2
* TypeScript: Base language for typing and safety

---
## Installation and Setup
**Clone the repository:**
```sh
git clone git@github.com:guilhermo/playwright-e2e-api-cucumber.git
cd playwright-e2e-api-cucumber
```
**Install dependencies:**
```sh
yarn install
```
**Install Playwright browsers:**
```sh
yarn playwright install --with-deps
```
**Configure environment variables:**

Create a `.env` file by duplicating `.env.example` and fill in the credentials. To make things easier, `.env.example` already contains working dummy data.

---
## Running the Tests

**Run All Tests (API, E2E, Mobile):**
```sh
yarn test:all
```
**Run API Tests Only:**
```sh
yarn test:api
```
**Run UI Tests Only (Desktop + Mobile):**
```sh
yarn test:e2e
```

---

## Generating Reports
**After execution, view the detailed HTML report with:**
```sh
yarn report
```
<img width="1624" height="947" alt="image" src="https://github.com/user-attachments/assets/5d7bb8db-b2c5-459b-afb8-b72340d4f7d9" />

---

## Continuous Integration (CI/CD)
The project includes a GitHub Actions pipeline that automatically runs the entire test suite on every push to the main branch.

<img width="1899" height="913" alt="image" src="https://github.com/user-attachments/assets/a772cc06-9cc2-4bb1-9eac-3b9411932751" />

---
