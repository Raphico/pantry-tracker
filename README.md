## Project Purpose

This project serves as a hands-on practice to explore and implement Clean Architecture principles within a Next.js environment. The aim is to structure the application into distinct layers — data access, business logic, and user interface — to ensure that the system is scalable, maintainable, and that the business logic remains independent of the technical framework in use. Additionally, this project provides an opportunity to work with advanced features in Next.js, such as forms and optimistic updates, using server actions. A key feature of the application is its ability to function with progressive enhancement, ensuring that the core functionality is accessible even when JavaScript is disabled.

## Running locally

1. clone this repository

```bash
git clone https://github.com/Raphico/pantry-tracker.git
cd pantry-tracker
```

2. copy and update environmental variables

```bash
cp .env.example .env
```

3. install dependencies

```bash
pnpm install
```

4. spin up docker container to run postgres

```bash
docker-compose up
```

5. update the database schema

```bash
pnpm run db:push
```

6. spin up the development server

```bash
pnpm run dev
```
