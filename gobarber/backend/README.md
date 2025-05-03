# GoBaber - Back-end (API REST em Node.js)

Este é o repositório da API REST do projeto GoBaber, desenvolvida em Node.js com TypeScript. Esta API é responsável por toda a lógica de negócio da aplicação, persistência de dados e comunicação com os front-ends web e mobile.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias principais:

-   **Node.js:** O ambiente de execução JavaScript para o servidor.
-   **TypeScript:** Um superset do JavaScript que adiciona tipagem estática, melhorando a segurança e a escalabilidade do código.
-   **Express:** Um framework web minimalista e flexível para Node.js, utilizado para construir a API REST.
-   **TypeORM:** Um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados PostgreSQL.
-   **PostgreSQL:** O sistema de gerenciamento de banco de dados relacional utilizado para persistir os dados da aplicação.
-   **Bcryptjs:** Uma biblioteca para realizar o hash de senhas, garantindo a segurança das credenciais dos usuários.
-   **Jsonwebtoken (JWT):** Utilizado para gerar e verificar tokens de autenticação, protegendo as rotas da API.
-   **Multer:** Um middleware para Node.js que facilita o tratamento de uploads de arquivos, como fotos de perfil de usuários e prestadores.
-   **Uuid:** Uma biblioteca para gerar IDs únicos.
-   **Date-fns:** Uma biblioteca moderna para manipulação e formatação de datas, crucial para o gerenciamento de agendamentos.
-   **CORS:** Middleware para habilitar o Cross-Origin Resource Sharing, permitindo que diferentes domínios (front-end e mobile) acessem a API.
-   **Express Async Errors:** Uma biblioteca para facilitar o tratamento de erros em funções assíncronas do Express.
-   **Celebrate:** Uma biblioteca para realizar a validação de dados de requisição utilizando o Joi (integrado no Celebrate).
-   **Tsyringe:** Uma biblioteca para injeção de dependências, promovendo a desacoplamento e a testabilidade do código.
-   **Reflect-metadata:** Uma dependência do TypeORM e do Tsyringe para funcionalidades avançadas de metadados.
-   **Handlebars:** Um motor de templates utilizado para gerar o conteúdo dos e-mails de recuperação de senha.
-   **Nodemailer:** Uma biblioteca para enviar e-mails, utilizada na funcionalidade de recuperação de senha.
-   **Redis e Ioredis:** Um banco de dados NoSQL em memória utilizado para caching e para a implementação de filas de background jobs (com o Rate Limiter Flexible).
-   **Rate Limiter Flexible:** Utilizado para implementar o controle de frequência de requisições, protegendo a API contra ataques de força bruta.
-   **MongoDB:** Um banco de dados NoSQL utilizado para armazenar as notificações dos prestadores de serviço.
-   **Socket.io:** Uma biblioteca para comunicação bidirecional em tempo real entre o servidor e os clientes (para envio de notificações).
-   **AWS SDK:** Utilizado para integração com serviços da Amazon Web Services, como o Simple Email Service (SES) para envio de e-mails em produção e, possivelmente, para armazenamento de arquivos (S3).
-   **Dotenv:** Uma biblioteca para carregar variáveis de ambiente de um arquivo `.env`.
-   **Class Transformer:** Uma biblioteca para transformar objetos JavaScript em outras estruturas, útil para formatar dados de resposta da API.
-   **Mime:** Uma biblioteca para determinar o tipo MIME de um arquivo.

## Scripts Disponíveis

No diretório raiz do projeto, você pode executar os seguintes scripts:

### `yarn build` ou `npm run build`

Compila o código TypeScript para JavaScript na pasta `dist`.

### `yarn dev:server` ou `npm run dev:server`

Inicia o servidor de desenvolvimento utilizando `ts-node-dev`, com suporte a hot reloading e inspeção.

### `yarn start` ou `npm start`

Inicia o servidor em modo de produção (após a compilação).

### `yarn typeorm` ou `npm run typeorm`

Executa a CLI do TypeORM para realizar operações no banco de dados, como criar migrations.

### `yarn test` ou `npm test`

Executa os testes unitários configurados para o back-end.

## Funcionalidades Principais

Este back-end implementa as seguintes funcionalidades:

### # Recuperação de senha

**RF (Requisitos Funcionais)**

-   O usuário deve poder solicitar a recuperação de sua senha informando seu endereço de e-mail.
-   O sistema deve enviar um e-mail contendo instruções e um link para a redefinição da senha.
-   O usuário deve ser capaz de definir uma nova senha através do link recebido por e-mail.

**RNF (Requisitos Não Funcionais)**

-   Utilização do Mailtrap para testes de envio de e-mails em ambiente de desenvolvimento.
-   Utilização do Amazon SES para envio de e-mails em ambiente de produção.
-   O envio de e-mails deve ser realizado em segundo plano, utilizando um sistema de background jobs (possivelmente com Redis e alguma biblioteca de filas).

**RN (Regras de Negócio)**

-   O link para redefinição de senha enviado por e-mail deve ter uma validade de 2 horas.
-   Ao definir uma nova senha, o usuário deve confirmá-la para evitar erros de digitação.

### # Atualização do perfil

**RF (Requisitos Funcionais)**

-   O usuário autenticado deve poder atualizar seu nome, endereço de e-mail e senha.

**RN (Regras de Negócio)**

-   O sistema não deve permitir a alteração do e-mail para um endereço que já esteja cadastrado no sistema.
-   Para atualizar a senha, o usuário deve primeiramente fornecer sua senha atual para verificação de identidade.
-   Ao definir uma nova senha, o usuário deve confirmá-la.

### # Painel do prestador

**RF (Requisitos Funcionais)**

-   O prestador de serviço autenticado deve poder listar todos os seus agendamentos para um dia específico.
-   O sistema deve enviar uma notificação ao prestador sempre que um novo agendamento for realizado para ele.
-   O prestador deve ter a capacidade de visualizar as notificações que ainda não foram marcadas como lidas.

**RNF (Requisitos Não Funcionais)**

-   Os agendamentos do prestador para um determinado dia devem ser armazenados em cache (possivelmente utilizando Redis) para otimizar a performance de leitura.
-   As notificações dos prestadores devem ser armazenadas em um banco de dados NoSQL MongoDB.
-   O envio de novas notificações aos prestadores deve ocorrer em tempo real utilizando a biblioteca Socket.io.

**RN (Regras de Negócio)**

-   Cada notificação deve possuir um status indicando se já foi lida ou não pelo prestador, permitindo o controle das notificações pendentes.

### # Agendamento de serviços

**RF (Requisitos Funcionais)**

-   O usuário autenticado deve poder listar todos os prestadores de serviço cadastrados na plataforma.
-   O usuário deve poder visualizar os dias de um determinado mês em que pelo menos um horário está disponível para um prestador específico.
-   O usuário deve poder listar todos os horários disponíveis em um dia específico de um prestador de serviço.
-   O usuário autenticado deve poder realizar um novo agendamento com um prestador de sua escolha, selecionando um horário disponível.

**RNF (Requisitos Não Funcionais)**

-   A listagem dos prestadores de serviço deve ser armazenada em cache (possivelmente utilizando Redis) para reduzir a carga no banco de dados.

**RN (Regras de Negócio)**

-   Os horários de agendamento devem estar disponíveis somente entre as 8h e as 18h (sendo o primeiro horário às 8h e o último às 17h, considerando agendamentos de 1 hora).
-   O usuário não pode realizar um agendamento para um horário que já passou.
-   Um usuário não pode agendar um serviço consigo mesmo.
-   Cada agendamento de serviço possui uma duração fixa de 1 hora.
-   O sistema não deve permitir que um usuário agende um serviço em um horário que já esteja ocupado por outro agendamento.

## Licença

Este projeto está licenciado sob a Licença MIT.

### ☕❤

[Robson H. Rodrigues](https://www.linkedin.com/in/robson-h-rodrigues-93341746/)
