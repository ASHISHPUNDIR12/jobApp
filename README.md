Project Title
A minimal starter template for Next.js, Prisma, and PostgreSQL with Docker.

Tech Stack
Next.js

Prisma

PostgreSQL (Docker)

tsx

Getting Started
Prerequisites
Node.js (v18.x or later)

Docker Desktop

1. Create Next.js Project
npx create-next-app@latest your-project-name
cd your-project-name

2. Install Dependencies
npm install prisma tsx --save-dev
npm install @prisma/client @prisma/extension-accelerate

3. Start PostgreSQL Container
docker run --name template -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

4. Initialize Prisma & Configure .env
npx prisma init --datasource-provider postgresql

Add the following line to the .env file created at the root of your project:

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

5. Run Database Migration
npx prisma migrate dev --name init

6. Start Development Server
npm run dev




