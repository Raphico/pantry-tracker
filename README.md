## Project Purpose

This project is a hands-on practice to explore and implement Clean Architecture principles within a Next.js environment. The aim is to achieve separate concerns between the application's data access, business, and user interface layers. The application consists of a "data-access" which encapsulates the data access layer responsible for interacting with the database, "use-cases" which encapsulates the business logic and rules each use case implements specific business rules and workflows, and "actions" which encapsulates the handles the interaction with the application, particularly on the server-side in Next.js. This approach ensures consistent data access, maintainability, and scalability of the application. Additionally, this project provides an opportunity to work with advanced features in Next.js, such as forms and optimistic updates, using server actions.

## Credits

- [](https://nextjs.org/blog/security-nextjs-server-components-actions)
- [](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
- [](https://github.com/webdevcody/ppai-next-starter)

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
