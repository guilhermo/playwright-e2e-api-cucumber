import { createBdd } from 'playwright-bdd';
import { expect, test } from '../../support/index';

const { Given, When, Then } = createBdd(test);

When('eu adiciono o primeiro produto ao carrinho', async ({ productsPage }) => {
  await productsPage.addFirstProductToCart();
});

When('prossigo para o checkout no carrinho', async ({ cartPage }) => {
  await cartPage.proceedToCheckout();
});

When('finalizo o pedido na tela de revisão', async ({ checkoutPage }) => {
  await checkoutPage.placeOrder();
});

When('preencho os dados de pagamento com o usuário do ambiente', async ({ paymentPage }) => {
  const cardName = process.env.CARD_NAME!;
  const cardNumber = process.env.CARD_NUMBER!;
  const cardCvc = process.env.CARD_CVC!;
  const cardMonth = process.env.CARD_EXP_MONTH!;
  const cardYear = process.env.CARD_EXP_YEAR!;

  await paymentPage.fillPaymentDetails(
    cardName,
    cardNumber,
    cardCvc,
    cardMonth,
    cardYear
  );
});

When('tento pagar com {string} {string} {string} {string} {string}', 
  async ({ paymentPage }, nome, numero, cvc, mes, ano) => {
    await paymentPage.fillPaymentDetails(nome, numero, cvc, mes, ano);
});

Then('devo visualizar a confirmação de pedido {string}', async ({ paymentDonePage }) => {
  await paymentDonePage.validateOrderSuccess();
});

Then('o sistema deve alertar que o campo {string} é inválido', async ({ paymentPage }, campo) => {
  const mapaCampos: Record<string, "name" | "number" | "cvc"> = {
    "nome": "name",
    "número": "number",
    "CVC": "cvc"
  };
  
  await paymentPage.validateFieldIsInvalid(mapaCampos[campo]);
});
