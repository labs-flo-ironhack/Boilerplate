# MERN Boilerplate

This is a MERN stack application boilerplate.
The client is using Vite and server is using JWT auth

## Setting up

Clone the project, remove the .git file set at the root directory.
`rm -rf .git`

### Initializing the client with git:

`cd ./client`  
`git init`  
`git add .` (yes.)  
`git commit -m "Initial Commit"`  
`git branch -M main`
Create an empty git repository for your client application copy the repo url and  
`git remote add origin <your origin>`  
`git push origin main`

### Initializing the server with git:

`cd ./server`  
`git init`  
`git add .`  
`git commit -m "Initial commit"`  
`git branch -M main`
Create an empty git repository for your server application, copy the repo url and  
`git remote add origin <your origin>`  
`git push origin main`

### @./client

- `npm install` to install all the dependencies.
- create a `.env` at same level as the `package.json` file, and set the environement variables.
- `npm run dev` to run the application.

### @./server

- `npm install` to install all the dependencies.
- create a `.env` at same level as the `package.json` file, and set the environement variables.
- `npm run dev` to run the application.

## Environment variables

### Client

VITE_APP_BACKEND_URL = ???

### Server

PORT = ???  
MONGODB_URI = ???  
FRONTEND_URL = ???  
TOKEN_SECRET = ????  

Enjoy.
