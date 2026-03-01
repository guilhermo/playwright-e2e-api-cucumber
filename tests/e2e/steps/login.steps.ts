import { createBdd } from 'playwright-bdd';
import { expect, test } from '../../support/index';

const { Given, When, Then } = createBdd(test);

Given('que eu acesso a página de login', async ({ loginPage }) => {
  await loginPage.visit();
});

When('eu realizo o login com credenciais válidas', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASS!);
});

When('eu tento logar com a senha errada', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_EMAIL!, 'senha_incorreta_123');
});

When('eu tento logar com o e-mail errado', async ({ loginPage }) => {
  await loginPage.login('email_invalido@teste.com', process.env.USER_PASS!);
});

When('clico no ícone {string} presente na navbar', async ({ loginPage }, icone) => {
  await loginPage.navigateToProductsPage(); 
});

Then('devo visualizar que o login foi concluído com sucesso', async ({ loginPage }) => {
  await loginPage.checkUserIsLoggedIn(process.env.USER_USERNAME!);
});

Then('devo visualizar a mensagem de erro de autenticação', async ({ loginPage }) => {
  await loginPage.validateErrorMessage();
});

Then('serei redirecionado para a página de produtos que contém a URL {string}', async ({ loginPage }) => {
  await loginPage.expectPageURL();
});