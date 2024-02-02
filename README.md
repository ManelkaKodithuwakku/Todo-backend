# Todo App

A simple todo-list application that allows users to create, view, update, and delete tasks.

## Used Tech Stack

- Loopback 4
- TypeScript
- MongoDB
- Node.js

## Setting up the Project and MongoDB

1. Clone the project:

   ```bash
   git clone https://github.com/ManelkaKodithuwakku/Todo-backend.git
   ```

2. Add a `.env` file with the following required fields to set up MongoDB:

   ```env
   DB_HOST=localhost
   DB_PORT=27017
   DATABASE=mydatabase
   DB_USER=user
   PASSWORD=password

   MONGO_ROOT_USERNAME=admin
   MONGO_ROOT_PASSWORD=adminPassword
   ```

3. Use the provided `docker-compose.yml` file to start MongoDB:

   ```bash
   sudo docker-compose up -d
   ```

## Install Dependencies

Dependencies are installed by default when the application is generated. If changes are made to `package.json`, install the dependencies with:

```bash
npm install
```

## Running the Application

```bash
npm start
```

Alternatively, you can use `node .` to skip the build step. Open http://127.0.0.1:3000 in your browser.

## Rebuilding the Project

To incrementally build the project:

```bash
npm run build
```

To force a full rebuild by cleaning up cached artifacts:

```bash
npm run rebuild
```
