# Blog API Monorepo

This monorepo contains 3 packages used to manage the blog.

## api

This is the backend REST API for the blog. It handles the database connection to store blog posts, comments and users, as well as authentication and authorization. It's built with Express and Prisma.

## [app](https://blog-app-vert-sigma.vercel.app/)

This is the main blog application. Here, users can view blog posts and leave comments. It's built with React Router 7.

## [admin](https://danielz0102-admin-blog.netlify.app/login)

This is an app intended only for the blog admin, who is the responsible for managing the blog's content. The admin has a full CRUD for the posts, and can save them as drafts to publish later if needed. It's built with Astro.

# What I've learned and practiced

- REST API architecture
- User authentication and authorization using JWT
- How to manage a monorepo structure
- Development of frontend apps with SSR
- How to configure CORS to allow requests from the client
- Simple deployment of web services
