import { type Page, type Locator, expect } from '@playwright/test';

export class PaymentDonePage {
  readonly page: Page;
  readonly orderPlacedHeader: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderPlacedHeader = page.locator('[data-qa="order-placed"]');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
  }

  async validateOrderSuccess() {
    await expect(this.orderPlacedHeader).toBeVisible();
    await expect(this.orderPlacedHeader).toContainText('Order Placed!');
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}