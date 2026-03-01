import { APIRequestContext } from '@playwright/test';

export class ProductRequests {
  constructor(private request: APIRequestContext) {}

  async getAllProducts() {
    return await this.request.get('/api/productsList');
  }

  async getAllBrands() {
    return await this.request.get('/api/brandsList');
  }

  async searchProduct(name: string) {
    return await this.request.post('/api/searchProduct', {
      form: { search_product: name }
    });
  }

  async invalidPostToProducts() {
    return await this.request.post('/api/productsList');
  }

  async deleteAccountInvalid() {
    return await this.request.delete('/api/deleteAccount');
  }

  async updateProduct() {
    return await this.request.put('/api/productsList');
  }
}