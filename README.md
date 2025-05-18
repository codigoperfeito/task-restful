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

- Backend desenvolvido em **NestJS**.
- Manipula dados via serviço interno `TasksService`.
- CORS deve estar habilitado para aceitar requisições do frontend (`localhost:4000`).

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

```bash
npm -i
npm run start:dev
```

### FrontEnd

```bash
npm -i
npm run dev
```

Em caso de problemas, mande uma mensagem [aqui](https://www.codigoperfeito.com.br).


