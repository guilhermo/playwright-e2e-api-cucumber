import { test as base } from "playwright-bdd";
import { expect, type Page } from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage";
import { CheckoutPage } from "./Pages/CheckoutPage";
import { ProductsPage } from "./Pages/ProductPage";
import { CartPage } from "./Pages/CartPage";
import { PaymentPage } from "./Pages/PaymentPage";
import { PaymentDonePage } from "./Pages/PaymentDonePage";
import { ProductRequests } from "../api/resquests/ProductRequests";

interface TestContext {
  /* E2E */
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;

  /* API */
  productRequests: ProductRequests;
}

export const test = base.extend<TestContext>({
  page: async ({ page }, use) => {
    await page.route("**/*.{google,doubleclick,adservice,zebra}**", (route) => route.abort());
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  paymentDonePage: async ({ page }, use) => {
    await use(new PaymentDonePage(page));
  },

  productRequests: async ({ request }, use) => {
    await use(new ProductRequests(request));
  },
});

export { expect };
