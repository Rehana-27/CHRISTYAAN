# CHRISTYAAN — Low-Code Full-Stack Starter with React & Node 🚀

[![Releases](https://img.shields.io/badge/Releases-download-blue?logo=github)](https://github.com/Rehana-27/CHRISTYAAN/releases)

[Live demo](https://christyaan.flatlogic.app) • Topics: docker, flatlogic, js, low-code, nginx, nodejs, postgresql, react, tailwind, ts

---

Preview
![App preview](https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80)

What this repo contains
- A low-code starter scaffold built with React, TypeScript, Tailwind CSS on the front end.
- Node.js + Express backend with REST API and authentication.
- PostgreSQL schema and seed files.
- Docker and docker-compose for dev and production.
- Nginx config for reverse proxy and static serving.
- Scripts to run, build, test, and deploy.

Why use this repo
- It pairs a modern React UI with a battle-tested Node/Postgres backend.
- It uses plain, readable code and a small set of tools.
- It fits cloud or self-hosted deployments with Docker.

Badges
[![React](https://img.shields.io/badge/Stack-React-blue?logo=react)](https://reactjs.org) [![Node.js](https://img.shields.io/badge/Stack-Node.js-green?logo=node.js)](https://nodejs.org) [![Postgres](https://img.shields.io/badge/DB-Postgres-316192?logo=postgresql)](https://www.postgresql.org) [![TypeScript](https://img.shields.io/badge/Lang-TypeScript-3178c6?logo=typescript)](https://www.typescriptlang.org) [![Tailwind](https://img.shields.io/badge/CSS-Tailwind-38b2ac?logo=tailwindcss)](https://tailwindcss.com) [![Docker](https://img.shields.io/badge/Infra-Docker-2496ed?logo=docker)](https://www.docker.com)

Table of contents
- Features
- Tech stack
- Quick start
- Run with Docker Compose
- Run locally (dev)
- Build and deploy (production)
- Configuration
- Database
- CI / CD
- Releases
- Contributing
- License
- Contact

Features
- Login, registration, JWT auth.
- Role-based access control.
- CRUD for core entities.
- Type-safe API with TypeScript.
- Responsive UI with Tailwind.
- Prebuilt Docker images for app, api, and db.
- Nginx reverse proxy and static asset serving.

Tech stack
- Front end: React, TypeScript, Tailwind CSS, React Router.
- Back end: Node.js, Express, TypeScript, JWT.
- Database: PostgreSQL with SQL migrations.
- Infra: Docker, docker-compose, Nginx.
- Bundler: Vite for the front end.
- CI: GitHub Actions (templates included).

Quick start — Docker (recommended)
- Clone this repo.
- Copy the env example files.
- Start services.

Commands:
```bash
git clone https://github.com/Rehana-27/CHRISTYAAN.git
cd CHRISTYAAN
cp .env.example .env
docker-compose up --build
```

After the services start:
- The front end runs at http://localhost:3000
- The API runs at http://localhost:4000
- Postgres listens on port 5432

Run with Docker Compose (detailed)
- Services:
  - web — React app served by Nginx
  - api — Node/Express service
  - db — PostgreSQL
  - adminer — DB admin (optional)
- Build and start:
```bash
docker-compose -f docker-compose.yml up --build -d
```
- To view logs:
```bash
docker-compose logs -f api
docker-compose logs -f web
```
- To stop and remove containers:
```bash
docker-compose down
```

Run locally (development)
- Front end (dev server):
```bash
cd web
npm install
npm run dev
```
- Back end (dev server with hot reload):
```bash
cd api
npm install
npm run dev
```
- Use the env files in the root for defaults. The back end looks for DATABASE_URL or separate DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME.

Build and deploy (production)
- Build front end:
```bash
cd web
npm run build
```
- Build Docker images:
```bash
docker build -t christyaan-web:latest web
docker build -t christyaan-api:latest api
```
- Start with docker-compose.prod.yml:
```bash
docker-compose -f docker-compose.prod.yml up -d
```
- Nginx will serve the built static files and proxy API calls to the api service.

Configuration
- All settings live in environment variables.
- Core variables:
  - NODE_ENV=production
  - PORT (api port)
  - DATABASE_URL or DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
  - JWT_SECRET
  - NEXT_PUBLIC_API_URL or REACT_APP_API_URL for the front end
- Example env files:
  - .env.example
  - web/.env.example
  - api/.env.example

Database
- The repo includes SQL migrations and seed data.
- To run migrations:
```bash
cd api
npm run migrate
npm run seed
```
- The docker-compose file runs migrations at container start if MIGRATE=true.
- Use the adminer service at http://localhost:8080 to inspect the DB.

Releases and downloads
[Download latest release](https://github.com/Rehana-27/CHRISTYAAN/releases)  
The linked Releases page contains packaged builds and install scripts. Download the release artifact that matches your platform and execute the included installer or run script. If the direct download link fails, check the "Releases" section on the repository page: https://github.com/Rehana-27/CHRISTYAAN/releases

Files you might find in Releases
- christyaan-linux.tar.gz — extract and run the start.sh script
- christyaan-windows.zip — unzip and run start.bat
- docker-images.tar.gz — load images with docker load
- changelog.md — release notes

Scripts (package.json)
- web:
  - dev — run Vite dev server
  - build — produce production bundle
  - lint — run ESLint
  - test — run Jest/React Testing Library
- api:
  - dev — run ts-node-dev
  - start — run compiled JS
  - migrate — run DB migrations
  - seed — seed DB
  - test — run backend tests

Logging and monitoring
- The api writes logs to stdout in JSON format.
- Use docker logs or a log aggregator.
- Add a monitoring container if you want Prometheus metrics.

Authentication and security
- Auth uses JWT. Tokens expire by default in 1 hour.
- Passwords use bcrypt hashing.
- CORS rules allow the front end origin in env configuration.
- Update JWT_SECRET in production and rotate keys periodically.

CI / CD
- The repo contains a GitHub Actions workflow:
  - Runs lint and tests on push.
  - Builds Docker images on tags.
  - Publishes release artifacts on tag creation.
- Edit .github/workflows/main.yml to match your registry credentials.

Contributing
- Fork the repo.
- Create a feature branch.
- Open a pull request with a clear title and description.
- Follow the code style and run lint before PR.
- Add tests for new features.

Code style
- TypeScript strict mode with strictNullChecks.
- ESLint + Prettier rules included.
- Tailwind utility classes for layout.

Common tasks
- Reset DB:
```bash
cd api
npm run db:reset
```
- Rebuild images:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
- Clear front-end cache:
```bash
cd web
npm run clean
```

Troubleshooting
- If the API cannot connect to Postgres, verify DATABASE_URL and DB credentials.
- If the front end shows CORS errors, set REACT_APP_API_URL to the API host.
- If a release package contains a start script, download the package from Releases and run the script on the target host.

Releases (again)
Use the Releases page to get installers and packages: https://github.com/Rehana-27/CHRISTYAAN/releases  
Download the appropriate archive for your platform and execute the included start or install script.

Credits
- Built with Flatlogic templates and customization.
- UI inspired by Tailwind UI patterns.
- Many open-source libraries power the project. See package.json for full list.

License
- MIT License. See LICENSE file for details.

Contact
- Issues: open an issue on GitHub.
- Pull requests: welcome.