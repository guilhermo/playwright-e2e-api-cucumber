import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutBtn = page.getByText('Proceed To Checkout');
  }

  async proceedToCheckout() {
    await this.page.waitForLoadState('load');
    await this.proceedToCheckoutBtn.waitFor({ state: 'visible' });
    await this.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
    
    await Promise.all([
      this.page.waitForURL(/.*checkout/, { waitUntil: 'commit' }), 
      this.proceedToCheckoutBtn.click()
    ]);
  }
}