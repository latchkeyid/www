import { defineConfig, devices } from "@playwright/test";

const port = 4321;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://localhost:${port}`,
    viewport: { width: 1360, height: 860 },
    deviceScaleFactor: 1,
    colorScheme: "light",
  },
  webServer: {
    // astro preview daemonises and returns, which Playwright reads as an early
    // exit; serve the built dist with something that stays in the foreground.
    command: "npm run build --prefix template && python3 -m http.server 4321 -d template/dist",
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium" }],
});
