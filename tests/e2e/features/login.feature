#language: pt
Funcionalidade: Validação do fluxo de Login

  Contexto:
    Dado que eu acesso a página de login

  Cenário: Deve realizar login com sucesso
    Quando eu realizo o login com credenciais válidas
    Então devo visualizar que o login foi concluído com sucesso

  Cenário: Deve exibir erro ao usar senha incorreta
    Quando eu tento logar com a senha errada
    Então devo visualizar a mensagem de erro de autenticação

  Cenário: Deve exibir erro ao usar email incorreto
    Quando eu tento logar com o e-mail errado
    Então devo visualizar a mensagem de erro de autenticação

  Cenário: Deve navegar para produtos após o login
      Quando eu realizo o login com credenciais válidas
      E clico no ícone "produtos" presente na navbar
      Então serei redirecionado para a página de produtos que contém a URL "/products"