import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

if (!process.env.APP_ENV) throw new Error("Variável APP_ENV não definida");

const e2eConfig = defineBddConfig({
  features: "tests/e2e/features/*.feature",
  steps: ["tests/e2e/steps/*.ts", "tests/support/index.ts"],
  outputDir: ".features-gen/e2e",
});

const apiConfig = defineBddConfig({
  features: "tests/api/features/*.feature",
  steps: ["tests/api/steps/*.ts", "tests/support/index.ts"],
  outputDir: ".features-gen/api",
});

export default defineConfig({

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    launchOptions: {
      slowMo: process.env.CI ? 0 : 50,
    },
  },

  projects: [
    {
      name: "api",
      testDir: apiConfig,
    },
    {
      name: "e2e-chromium",
      testDir: e2eConfig,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: 'mobile-pixel',
      testDir: e2eConfig,
      use: { ...devices['Pixel 7'] },
    },
  ],
});
