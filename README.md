# Task Manager

## Backend (NestJS)

### Endpoints `/tasks`

| Método | URL           | Descrição                     | Request Body                             | Response                     |
|--------|---------------|-------------------------------|----------------------------------------|------------------------------|
| GET    | `/tasks`      | Retorna todas as tarefas       | —                                      | Array de tarefas (JSON)       |
| GET    | `/tasks/:id`  | Retorna uma tarefa pelo ID     | —                                      | Objeto tarefa (JSON)          |
| POST   | `/tasks`      | Cria uma nova tarefa           | `{ title: string, description: string }` | Objeto tarefa criado (JSON)   |
| PUT    | `/tasks/:id`  | Atualiza uma tarefa existente  | `{ title: string, description: string, complete: boolean }` | Objeto tarefa atualizado (JSON) |
| DELETE | `/tasks/:id`  | Remove uma tarefa              | —                                      | Status 200 ou erro            |

### Observações

## Backend

### Visão Geral

- O backend foi desenvolvido utilizando o framework **NestJS**.
- A documentação da API foi criada com **Swagger** para facilitar a integração e o uso.

### Estrutura de Pastas

O backend possui dois modos de operação, organizados em subpastas:

1. **`/backend-off-sqlite`**:
   - Manipula dados usando o serviço interno `TasksService` sem conexão com o banco de dados.


2. **`/backend-on-sqlite`**:
   - Manipula dados utilizando o banco de dados **SQLite** através do **Prisma**.

### Observações Importantes

- O **CORS** deve estar habilitado para permitir requisições do frontend na origem `http://localhost:4000`.


---

## Frontend (React + Axios + TailwindCSS)

### Funcionalidades principais

- Login simples com username salvo no `localStorage`.
- Listagem de tarefas consumindo API REST.
- Adicionar, editar, excluir tarefas.
- Marcar tarefas como completas/incompletas.
- Controle de sessão com redirecionamento para login se não autenticado.
- Logout que limpa o `localStorage` e redireciona.

### Componentes e Tecnologias

- Componente principal: `TaskManager` (React Functional Component).
- Usa hooks: `useState`, `useEffect`.
- Chamada HTTP via `axios` para `http://localhost:3000/tasks`.
- Estilização rápida e responsiva com **TailwindCSS**.

### Fluxo do aplicativo

 Usuário acessa a aplicação. Se não estiver logado (sem `username` no `localStorage`), é redirecionado para a página de login.
 Após login, o usuário pode criar, editar, excluir e marcar tarefas.
 A lista de tarefas é atualizada automaticamente após cada ação.
 Botão de logout limpa a sessão e redireciona para a página de login.

---

## Requisitos para rodar

- Backend rodando em `http://localhost:3000` (porta padrão NestJS)
- Frontend rodando em `http://localhost:4000` (porta configurada)
- Backend com CORS habilitado para `localhost:4000`

---

## Como rodar

### Bash

```bash
Git clone https://github.com/codigoperfeito/task-restful/
Cd task-restful
```

### Backend

***obs:existem duas partes o com SQLite e sem SQLite escolha qualquer um dos dois***

##### ***sem SQLite***(backend-off-sqlite)

```bash
npm -i
npm run start:dev
```

##### ***com SQLite(backend-on-sqlite)***

```bash
npm -i
npx prisma generate
npm run start:dev
```

### FrontEnd

```bash
npm -i
npm run dev
```

Em caso de problemas, mande uma mensagem [aqui](https://www.codigoperfeito.com.br).


