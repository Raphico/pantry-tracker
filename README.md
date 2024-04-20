## Project Purpose

This project serves as a hands-on practice to explore and implement Clean Architecture principles within a Next.js environment. The aim is to achieve separate of concerns between data access layer, the part of the application that interacts with database, and the user interface layer. The result is communicated to the user interface layer with DTOs. This approach ensures consistent data access, maintainability, and scalability of the application. Additionally, this project provides an opportunity to work with advanced features in Next.js, such as forms and optimistic updates, using server actions. A key feature of the application is its ability to function with progressive enhancement, ensuring that the core functionality is accessible even when JavaScript is disabled.

## Credits

- [](https://nextjs.org/blog/security-nextjs-server-components-actions)

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
