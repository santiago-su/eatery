# Eatery

Web Application for tourists that want to look for nice restaurants near them,
also allows them to view other persons reviews on those restaurants and review
them themselves.

## Background

It's not the best but I had to cut corners because of the time.

## Features

- **[JWT Authentication]** - Usage of JSON Web Tokens for Auth

## Built With

- Angular 1.6.4
- Node 7.10.0
- Express 4.15.2
- MongoDB 2.2.26
- Mongoose 4.9.7
- Webpack 2
- Gulp 3.9.1
- AngularMaterial
- JWT Tokens
- Bcrypt

And more...

## Usage

Allow localhost to know your location, then it's all good.

## Installation

Be sure you have homebrew installed and do
```sh
brew install mongodb
```
and follow instructions to initiate a mongo daemon, then:

```sh
git clone https://github.com/santiago-su/eatery.git && cd eatery
npm install
npm start
```

## Test

```sh
npm test
```

## Linting

```sh
npm run lint
```

## Details


#### Neat implementation of both the user interface and the API.

Modularized application with defined API routes, authentication, and a
neat user interface

#### Linting for both business logic and CSS (or for preprocessor)

ESlint with normal rules

#### Tests for either the backend or / and frontend code with or without test coverage

Integration tests for the routes on the backend

#### Clear way on how to integrate the CI approach

npm scripts can be made to lint before deployment, creation of a test server, etc.

#### Documentation – e.g. JSDocs, a readme.md file, Swagger, etc

Ain't this neat?

#### Description on how this application can be deployed – Heroku, Amazon, Google,or whatever method you prefer

We got webpack to bundle everything and gulp to watch changes, couldn't finish deployment
on time but with the use of env variables to keep secret keys actually secret, and maybe
not using webpack 2 yet on Heroku because it's a pain to find out what's not compiling correctly, it would be pretty easy to deploy just setup a start script or gulp and configure gulp to serve your.. server after a successful build.

#### TODOS

- More integration tests
- Unit tests
- Hiding 'secret keys' on env variables, maybe use .dotenv
- Deploy
- Logout link on header
