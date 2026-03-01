import { type Page, type Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly firstProductCard: Locator;
  readonly overlayAddToCartBtn: Locator;
  readonly cartModal: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstProductCard = page.locator('.single-products').first();
    
    this.overlayAddToCartBtn = page.getByText('Add to cart').nth(1);

    this.cartModal = page.locator('#cartModal');
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
  }

  async addFirstProductToCart() {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await this.firstProductCard.hover();

    await this.overlayAddToCartBtn.waitFor({ state: 'visible' });
    await this.overlayAddToCartBtn.click();

    await this.cartModal.waitFor({ state: 'visible', timeout: 10000 });
    await this.viewCartLink.waitFor({ state: 'visible' });
    await this.viewCartLink.click();
  }
}