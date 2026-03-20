# Desafio React - Cadastro de Usuários

Aplicação front-end para listagem, cadastro, edição e exclusão de usuários, desenvolvida com React e TypeScript.

O projeto consome uma API REST para carregar os usuários iniciais e mantém as interações de criação/edição/exclusão com feedback visual para o usuário.

## Stack utilizada

- React
- TypeScript
- React Router
- Context API
- Axios
- React Hook Form
- React Toastify
- Tailwind CSS

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Yarn instalado

### Passos

```bash
yarn install
yarn start
```

A aplicação ficará disponível em:

[http://localhost:3000](http://localhost:3000)

## Decisões técnicas

- **Context API**
  - Usada para centralizar o estado global de usuários, loading e erro.
  - Evita prop drilling entre páginas e componentes.

- **Axios com interceptor**
  - Configuração centralizada em `src/services/api.ts`.
  - Interceptor de resposta padroniza tratamento de erros com `AppError`.

- **Validação com React Hook Form**
  - Validação declarativa dos campos no formulário de usuário.
  - Regras como obrigatório, tamanho mínimo e formato de e-mail.
  - Mensagens de erro exibidas diretamente abaixo dos campos.

## Funcionalidades implementadas

- Listagem de usuários com busca por nome
- Cadastro de usuário
- Edição de usuário
- Exclusão de usuário
- Estado de carregamento
- Estado visual de erro com ação de tentar novamente
- Estado vazio quando não há resultados
- Layout responsivo para mobile e desktop
