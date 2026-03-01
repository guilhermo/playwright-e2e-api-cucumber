#language: pt
Funcionalidade: Gestão do Catálogo de Produtos via API

  Contexto:
    Dado que o serviço de catálogo de produtos está operacional

  @positivo @contrato
  Cenário: Validar integridade do contrato, headers e SLA da lista de produtos
    Quando eu solicito a lista de todos os produtos
    Então valido que o status code HTTP é 200
    E valido que o header Content-Type contém "text/html"
    E a resposta deve respeitar o schema de produtos
    E o tempo de resposta deve ser inferior a 1500ms

  @positivo @funcional
  Cenário: Realizar busca refinada de produto por nome via POST
    Quando eu envio um POST para buscar o produto "Blue Top"
    Então o responseCode no corpo JSON deve ser 200
    E os detalhes do produto devem exibir o preço "Rs. 500" e marca "Polo"

  @positivo @tarefa2
  Cenário: Validar listagem de todas as marcas (GET)
    Quando eu solicito a lista de todas as marcas
    Então valido que o status code HTTP é 200
    E o responseCode no corpo JSON deve ser 200

  @negativo @seguranca
  Cenário: Tentar usar método POST em endpoint exclusivo de GET
    Quando eu tento enviar um POST para o endpoint de listagem
    Então o responseCode no corpo JSON deve ser 405
    E a mensagem de erro deve conter "This request method is not supported"

  @negativo @funcional
  Cenário: Buscar produto inexistente e validar retorno vazio
    Quando eu envio um POST para buscar o produto "ItemQueNaoExiste999"
    Então o responseCode no corpo JSON deve ser 200
    E a mensagem de erro deve conter "[]"

  @negativo
  Cenário: Tentar deletar conta sem fornecer parâmetros obrigatórios
    Quando eu tento deletar uma conta sem parâmetros
    Então o responseCode no corpo JSON deve ser 400
    E a mensagem de erro deve conter "Bad request, email parameter is missing in DELETE request."

  @negativo
  Cenário: Tentar atualizar informações via PUT em endpoint não permitido
    Quando eu tento atualizar uma conta via PUT sem dados
    Então o responseCode no corpo JSON deve ser 405
    E a mensagem de erro deve conter "This request method is not supported"