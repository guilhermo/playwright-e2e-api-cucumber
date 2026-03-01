import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedInAsIndicator: Locator;
  readonly errorMessage: Locator;
  readonly productsNavBar: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');

    this.loggedInAsIndicator = page.locator("li", { hasText: "Logged in as" });
    this.errorMessage = page.locator('form[action="/login"] p');

    this.productsNavBar = page.getByText("Products");
  }

  async visit() {
    await this.page.goto("/login");
    await this.page.waitForLoadState("load");
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click({ force:true });
  }

  async checkUserIsLoggedIn(username: string) {
    await expect(this.loggedInAsIndicator).toBeVisible();
    await expect(this.loggedInAsIndicator).toContainText(username);
  }

  async validateErrorMessage() {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(this.errorMessage).toHaveText(/incorrect/i);
  }

  async navigateToProductsPage() {
    await expect(this.productsNavBar).toBeVisible();
    await this.productsNavBar.click();
  }

  async expectPageURL() {
    await expect(this.page).toHaveURL(/.*products/);
  }
}
