# Duty List Web Application
An end-to-end web application that allows the user to read, create and update a to-do list of duties of any kind.

![Application Sample](https://i.imgur.com/sbq9j4T.png)

## Demo

[Please have a try](https://react-antd-todo.netlify.com/)

## Installation Guide

First of all, clone this `repo`:

```sh
$ git clone https://github.com/hokminglee0803/nexplore.git
```

Move to the project dir:

```sh
$ cd nexplore/
```

Move to the backend:

```sh
$ cd backend/
```

Create .env and set your port and paste your postgresql connection string:

```sh
PORT=3001
POSTGRE_SQL_CONNECTION_STRING=postgresql://xxxxxxxxxxxxx
```

Build and start the backend:

```sh
$ npm install
$ npm run build
$ npm run start
```

Move to the frontend

```sh
$ cd frontend/
```

Build and start the backend:

```sh
$ npm install
$ npm run build
$ npm install -g serve
$ serve -s build
```

### License

This Project is [MIT licensed](./LICENSE) © [Marco Lee](https://www.linkedin.com/in/hok-ming-marco-lee-131b70179/)