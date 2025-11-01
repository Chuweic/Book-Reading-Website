# Here is the link
HTTP://assignment-03-chuwei-cai.vercel.app

# Here is the link
HTTP://assignment-03-chuwei-cai.vercel.app



+# What Do You Want to Read Today?
+
+A full-stack reading companion that lets authenticated readers browse trending titles, view rich book details, and curate a personal reading list. The React single-page application pulls daily trending data from the Open Library API, while the secure Express API persists user preferences with Prisma and a MySQL-compatible database. Auth0 handles authentication for both the UI and API layers, and the project is production-ready with Vercel deployment settings.
+
+## Features
+- **Trending discovery:** Surfaces the top books of the day from the Open Library trending endpoint with lazy-loaded cover art for fast browsing.
+- **Book details:** Provides summaries, metadata, and cover art for each book using dynamic routes (`/books/:isbn`).
+- **Personal reading list:** Stores books selected by each user, with add/remove actions backed by Prisma models and persisted per Auth0 identity.
+- **Profile management:** Allows users to review their profile data and update their nickname via secure API calls.
+- **Auth0-secured experience:** Protects all sensitive endpoints with JWT validation and keeps the client session in sync with Auth0.
+- **Production-ready hosting:** Includes `vercel.json` configuration to build the client workspace automatically when new commits land on the tracked branch.
+
+## Tech Stack
+- **Front-end:** React 18, React Router, Auth0 React SDK, Create React App toolchain, CSS modules for styling.
+- **Back-end:** Node.js 18+, Express 4, express-oauth2-jwt-bearer middleware, Morgan logging, CORS.
+- **Data layer:** Prisma ORM with a MySQL-compatible datasource for users, read lists, and books.
+- **Testing:** Jest with React Testing Library for component and integration coverage.
+- **Tooling & Deployment:** Vercel for hosting (SPA + serverless API), npm workspaces, dotenv for configuration management.
+

+## Prerequisites
+- **Node.js 18.x** (installs npm automatically).
+- **MySQL 8.x** or a hosted alternative (PlanetScale, Amazon RDS, etc.).
+- **Auth0 tenant** with one API (for the Audience) and one Single Page Application (for the Domain and Client ID).
+- (Optional) **Vercel CLI** if you want to trigger deployments from the terminal.
+
+## Environment Variables
+Create the following files before running the app locally:
+
+### `api/.env`
+```
+PORT=8080
+DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/assignment03"
+AUTH0_AUDIENCE="https://assignment-api.example"
+AUTH0_ISSUER="https://dev-yourtenant.us.auth0.com/"
+```
+- `DATABASE_URL` should target your MySQL instance.
+- `AUTH0_AUDIENCE` matches the identifier configured for your Auth0 API.
+- `AUTH0_ISSUER` is your Auth0 domain with an `https://` prefix.
+
+### `client/.env.local`
+```
+REACT_APP_AUTH0_DOMAIN=dev-yourtenant.us.auth0.com
+REACT_APP_AUTH0_CLIENT_ID=yourSpaClientId
+REACT_APP_AUTH0_AUDIENCE=https://assignment-api.example
+REACT_APP_API_URL=http://localhost:8080
+```
+The React app reads these variables at build time, so restart the dev server after changing them.
+
+## Local Development
+1. **Install dependencies**
+   ```bash
+   # API dependencies (installs Prisma and pushes the schema)
+   cd api
+   npm install
+
+   # Client dependencies
+   cd ../client
+   npm install
+   ```
+
+2. **Prepare the database**
+   ```bash
+   mysql -u root -p -e "CREATE DATABASE assignment03 CHARACTER SET utf8mb4;"
+   ```
+
+3. **Run the API**
+   ```bash
+   cd api
+   npm start
+   ```
+   The API listens on `http://localhost:8080` by default and exposes routes such as `/verify-user`, `/read-list`, and `/readlist/addBook`.
+
+4. **Run the React client**
+   ```bash
+   cd client
+   npm start
+   ```
+   Create React App serves the SPA at `http://localhost:3000`. Log in with Auth0 to sync your profile and reading list.
+
+## Testing
+Run the React component tests from the `client` folder:
+```bash
+cd client
+npm test -- --watchAll=false
+```
+This executes the Jest + React Testing Library suites for critical views like Home and MyProfile.
+
+## Deployment
+1. **Push to Git** – Vercel is configured to rebuild the client workspace (`client/`) whenever new commits land on the tracked branch.
+2. **Environment variables** – Set the same `REACT_APP_*` values for the client project and `AUTH0_*`, `DATABASE_URL` (and any other secrets) for the API project inside the Vercel dashboard.
+3. **Redeploy** – Use the Vercel dashboard’s **Redeploy** button or run `vercel deploy --prod` from the respective directory to publish new builds.
+
+## Useful Endpoints
+- `GET /ping` – Health check for the API.
+- `POST /verify-user` – Creates or fetches an Auth0 user record.
+- `GET /read-list` – Returns the authenticated user’s saved books.
+- `POST /readlist/addBook` – Adds a book to the user’s read list.
+- `DELETE /readlist/removeBook/:bookId` – Removes a book by its ID.
+
