# API FUNCTIONAL


Code that manager the different functionals

## Getting Started

### ✅ Prerequisites

To windows ,could be necessary run 'npm i' (Could not find any Visual Studio installation to use..)
Solution (https://github.com/nodejs/node-gyp#on-windows): 
```
npm install --global --production windows-build-tools (ejecutar comando en cmd con permisos de administrador)
```

Docker: To run mongoDB in local you need install docker in your machine. 

Next, just download the docker's image in this web side https://hub.docker.com/_/mongo

For start the server just run in terminal:
```
docker-compose up -d
```
and now connect to mongoDB in local. 

### 👩‍💻  Installing

Install package.json
```
npm install
```

And run

```
npm start
```

In localhost port 3001 the side will be executing
## Running the tests

Is want run the unit test execute:
```
npm test
```

## 🛠️  Deployment

The .env file contain all the secret variables for configure the project.
