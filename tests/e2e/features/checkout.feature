# language: pt
Funcionalidade: Fluxo de Checkout e Pagamento

  Contexto:
    Dado que eu acesso a página de login
    E eu realizo o login com credenciais válidas
    E clico no ícone "products" presente na navbar

  @positivo
  Cenário: Realizar compra completa de um produto com sucesso
    Quando eu adiciono o primeiro produto ao carrinho
    E prossigo para o checkout no carrinho
    E finalizo o pedido na tela de revisão
    E preencho os dados de pagamento com o usuário do ambiente
    Então devo visualizar a confirmação de pedido "Order Placed!"

  @negativo
  Esquema do Cenário: Validar campos obrigatórios no pagamento
    Quando eu adiciono o primeiro produto ao carrinho
    E prossigo para o checkout no carrinho
    E finalizo o pedido na tela de revisão
    E tento pagar com "<nome>" "<numero>" "<cvc>" "<mes>" "<ano>"
    Então o sistema deve alertar que o campo "<campo_alvo>" é inválido

    Exemplos:
      | nome    | numero | cvc | mes | ano  | campo_alvo | motivo         |
      |         | 1234   | 123 | 12  | 2030 | nome       | Nome vazio     |
      | Demarco |        | 123 | 12  | 2030 | número     | Número vazio   |
      | Demarco | 1234   |     | 12  | 2030 | CVC        | CVC vazio      |