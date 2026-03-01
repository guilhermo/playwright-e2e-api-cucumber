import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../support/index';

const { Given, When, Then } = createBdd(test);

let response: any;
let startTime: number;

Given('que o serviço de catálogo de produtos está operacional', async ({ productRequests }) => {
  const res = await productRequests.getAllProducts();
  expect(res.status()).toBe(200);
});

When('eu solicito a lista de todos os produtos', async ({ productRequests }) => {
  startTime = Date.now();
  response = await productRequests.getAllProducts();
});

When('eu solicito a lista de todas as marcas', async ({ productRequests }) => {
  response = await productRequests.getAllBrands();
});

When('eu envio um POST para buscar o produto {string}', async ({ productRequests }, name) => {
  response = await productRequests.searchProduct(name);
});

When('eu tento enviar um POST para o endpoint de listagem', async ({ productRequests }) => {
  response = await productRequests.invalidPostToProducts();
});

When('eu tento deletar uma conta sem parâmetros', async ({ productRequests }) => {
  response = await productRequests.deleteAccountInvalid();
});

When('eu tento atualizar uma conta via PUT sem dados', async ({ productRequests }) => {
  response = await productRequests.updateProduct();
});

Then('valido que o status code HTTP é {int}', async ({}, status) => {
  expect(response.status()).toBe(status);
});

Then('valido que o header Content-Type contém {string}', async ({}, header) => {
  expect(response.headers()['content-type']).toContain(header);
});

Then('o tempo de resposta deve ser inferior a {int}ms', async ({}, limit) => {
  const duration = Date.now() - startTime;
  expect(duration).toBeLessThan(limit);
});

Then('a resposta deve respeitar o schema de produtos', async () => {
  const body = await response.json();
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);
  
  if (body.products.length > 0) {
    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
  }
});

Then('os detalhes do produto devem exibir o preço {string} e marca {string}', async ({}, preco, marca) => {
  const body = await response.json();
  const product = body.products[0];
  expect(product.price).toBe(preco);
  expect(product.brand).toBe(marca);
});

Then('o responseCode no corpo JSON deve ser {int}', async ({}, code) => {
  const body = await response.json();
  expect(body.responseCode).toBe(code); 
});

Then('a mensagem de erro deve conter {string}', async ({}, message) => {
  const body = await response.json();
  const responseContent = body.message || JSON.stringify(body.products);
  expect(responseContent).toContain(message);
});