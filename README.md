# 🎭 Playwright - E2E & API Automation + Cucumber

Projeto de automação para a plataforma **Automation Exercise**, cobrindo fluxos de ponta a ponta (E2E) e validações de serviços (API).

---

## 🚀 Visão Geral
Este framework foi desenvolvido para simular um cenário real de produção, com foco em resiliência, performance e clareza. Ele integra testes de **API**, **Interface Desktop** e **Emulação Mobile** em uma esteira única de CI/CD.

### 📊 Status dos Testes
Atualmente, a suíte conta com **23 cenários**:
* **API**: 7 testes de contrato, SLA e funcionalidade.
* **E2E Desktop**: 8 cenários de fluxos de login e checkout.
* **E2E Mobile (Pixel 7)**: 8 cenários de fluxos críticos em ambiente mobile.

---

## 🏗️ Arquitetura e Estrutura de Pastas
O projeto utiliza o padrão **Page Object Model (POM)** para UI e **Request Objects** para API.

```text
.
├── .github/workflows/    # Configuração de CI/CD (GitHub Actions)
├── tests/
│   ├── api/              # Camada de testes de API (BDD)
│   │   ├── features/     # Cenários em Gherkin
│   │   ├── resquests/    # Lógica de chamadas HTTP
│   │   └── steps/        # Implementação dos steps de teste
│   ├── e2e/              # Camada de testes de Interface (BDD)
│   │   ├── features/     # Cenários de Login e Checkout
│   │   └── steps/        # Implementação dos steps de teste
│   └── support/          # Page Objects e Fixtures Globais
├── playwright.config.ts  # Configuração global do framework
└── package.json          # Gerenciamento de scripts e dependências
```
## 🛠️ Tecnologias e Versões
* Node.js: v20+ (LTS recomendado)
* Playwright: ^1.58.2
* Playwright-BDD: ^8.4.2
* TypeScript: Linguagem base para tipagem e segurança

---
## 📦 Instalação e Configuração
**Clonar o repositório:**
```sh
git clone git@github.com:guilhermo/playwright-e2e-api-cucumber.git
cd playwright-e2e-api-cucumber
```
**Instalar dependências:**
```sh
yarn install
```
**Instalar navegadores do Playwright:**
```sh
yarn playwright install --with-deps
```
**Instalar navegadores do Playwright:**

Crie um arquivo .env duplicando o .env.example e preencha as credenciais. Para facilitar a execução, o .env.example já contém dados fictícios funcionais.

---
## 🧪 Executando os Testes

**Executar Todos os Testes (API, E2E, Mobile):**
```sh
yarn test:all
```
**Executar Apenas Testes de API:**
```sh
yarn test:api
```
**Executar Apenas Testes de Interface (Desktop + Mobile):**
```sh
yarn test:e2e
```

---

## 📊 Gerando Relatórios
**Após a execução, visualize o relatório HTML detalhado com:**
```sh
yarn report
```
<img width="1624" height="947" alt="image" src="https://github.com/user-attachments/assets/5d7bb8db-b2c5-459b-afb8-b72340d4f7d9" />

---

## ⚙️ Integração Contínua (CI/CD)
O projeto conta com um pipeline no GitHub Actions que executa automaticamente toda a suíte de testes a cada push na branch principal.

<img width="1899" height="913" alt="image" src="https://github.com/user-attachments/assets/a772cc06-9cc2-4bb1-9eac-3b9411932751" />

---
