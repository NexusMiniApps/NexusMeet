# NexusMeet

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

| Project Setup Configuration |                                    |
| --------                    | -------                            |
| Project name                | nexusmeet                          |
| Typescript or Javascript    | Typescript                         |  
| TailwindCSS                 | Yes                                |
| tRPC                        | No                                 |
| Authentication Provider     | NextAuth.js                        |
| Database ORM                | Prisma                             |
| Next.js App Router          | Yes                                |
| Database Provider           | PostgreSQL                         |
| Import aliases              | @components/* @styles/* @utils/*   |

### Set up project:
- npm i?
  
### Run Locally:
```
npm run dev
```
This runs the server on localhost:3000

### Database schema:
```
npx prisma db push
```
Sync the Prisma schema with the database and generate Typescript types for the Prisma client based on the schema.

### Frontend:

I am using [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction) primitives with [shadcn](https://https://ui.shadcn.com/).

## T3 Stack Documentation

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle](https://orm.drizzle.team) (not in use)
- [tRPC](https://trpc.io) (not in use)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)
- [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
