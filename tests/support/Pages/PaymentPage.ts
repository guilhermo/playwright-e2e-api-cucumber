import { type Page, type Locator, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('[data-qa="pay-button"]');
    this.successMessage = page.locator('[data-qa="order-placed"]');
  }

  async fillPaymentDetails(
    name: string,
    number: string,
    cvc: string,
    month: string,
    year: string,
  ) {
    await this.nameOnCard.waitFor({ state: 'visible' });
    await this.nameOnCard.fill(name);
    await this.cardNumber.fill(number);
    await this.cvc.fill(cvc);
    await this.expiryMonth.fill(month);
    await this.expiryYear.fill(year);
    
    await this.payAndConfirmBtn.scrollIntoViewIfNeeded();
    await this.payAndConfirmBtn.click();
  }

  async validateOrderConfirmed() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText("Order Placed!");
  }

  async validateFieldIsInvalid(selector: "name" | "number" | "cvc") {
    const locators = {
      name: this.nameOnCard,
      number: this.cardNumber,
      cvc: this.cvc,
    };

    const isInvalid = await locators[selector].evaluate(
      (node: HTMLInputElement) => {
        return !node.checkValidity();
      },
    );

    expect(isInvalid).toBe(true);
  }
}
