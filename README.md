# NLW Agents - Backend

Este é o back-end do projeto **NLW Agents**, responsável por gerenciar a criação de salas, recebimento de áudios, integração com a API Gemini e persistência dos dados.

## ✨ Funcionalidades

- Criação e gerenciamento de salas
- Recebimento e tratamento de arquivos de áudio
- Envio das perguntas para a API Gemini
- Armazenamento das perguntas e respostas no banco de dados
- Integração com banco de dados PostgreSQL usando Drizzle ORM

## 🧪 Tecnologias utilizadas

- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL + pgvector](https://github.com/pgvector/pgvector)
- [Google Generative AI (Gemini API)](https://ai.google.dev/)
- Plugins do Fastify:
  - `@fastify/cors`
  - `@fastify/multipart`
  - `fastify-type-provider-zod`

## ⚙️ Scripts disponíveis

- `npm run dev` – Inicia o servidor em modo de desenvolvimento
- `npm run start` – Inicia o servidor em produção
- `npm run db:generate` – Gera as migrações com o Drizzle Kit
- `npm run db:migrate` – Executa as migrações no banco de dados
- `npm run db:seed` – Popula o banco com dados iniciais

## 🐳 Usando Docker Compose para o banco de dados

Você pode iniciar o banco PostgreSQL com extensão `pgvector` usando o arquivo `docker-compose.yml`:

```yaml
services:
  nlw-agents-pg:
    image: pgvector/pgvector:pg17
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: agents
    volumes:
      - ./docker/setup.sql:/docker-entrypoint-initdb.d/setup.sql
```

Para iniciar o serviço, use:

```bash
docker compose up -d
```

## 📁 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=
DATABASE_URL=postgres://docker:docker@localhost:5432/agents
GEMINI_API_KEY=
```

## 📦 Instalação e uso

```bash
# Instale as dependências
npm install

# Crie o arquivo .env com os dados necessários

# Execute as migrações
npm run db:migrate

# Popule o banco com dados iniciais (opcional)
npm run db:seed

# Inicie o servidor em modo desenvolvimento
npm run dev
```

---

Projeto desenvolvido durante o evento **Next Level Week (NLW)** da Rocketseat 💜.
