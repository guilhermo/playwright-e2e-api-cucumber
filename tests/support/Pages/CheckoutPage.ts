import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
  }

  async placeOrder() {
    await this.placeOrderBtn.waitFor({ state: 'visible' });
    await this.placeOrderBtn.scrollIntoViewIfNeeded();
    
    await this.page.waitForTimeout(500);
    
    await Promise.all([
      this.page.waitForURL(/.*payment/, { waitUntil: 'commit' }), 
      this.placeOrderBtn.click()
    ]);
  }
}