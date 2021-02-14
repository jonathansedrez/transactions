# Transactions APP

Aplicação feita em React consumindo a [API de transações](https://warren-transactions-api.herokuapp.com/api/transactions).

Você pode acessar a aplicação por [aqui](https://transactions-app.netlify.app/).

</br>

### Desenvolvimento

Utilize o comando `yarn start` para abrir a aplicação em modo de desenvolvimento. A aplicação irá abrir automaticamente em `http://localhost:3000/`. O aplicativo automaticamente se atualiza com cada modificação nos arquivos.

</br>

### Build

Utilize o comando `yarn build` para fazer o build do projeto. Os artefatos serão gerados no diretório `build/`. Durante o processo de deploy será necessario indicar esse diretorio para efetuar o processo corretamente.

</br>

### Testes unitários

Utilize o comando `yarn test` para executar todos testes unitários da aplicação.

</br>

### Testes integração

Utilize o comando `yarn test:e2e` para abrir o executável de testes de integrações gerados pelo Cypress. Selecionando o teste irá se iniciar uma bateria de testes.

</br>

### Deploy

O deploy é feito utilizando o [Netlify](https://www.netlify.com/). Toda publicação feita para a branch master irá inicar o processo de deploy automaticamente. Depois de finalizado o site já estará disponivel para acesso.

Todo push feito para o repositório irá iniciar uma bateria de testes unitários, caso tenha sucesso a publicação será feita para o repositório.

</br>

## Tecnologias

- React JS (CRA)
- Typescript
- Webpack
- Less
- Jest
- React Testing Library
- Cypress
- Axios
