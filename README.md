# CS 312 Image glitching project

[![Build Status](https://travis-ci.com/csci312a-s19/fp-glitching.svg?token=FbqFHeyeND34zxruwhBy&branch=master)](https://travis-ci.com/csci312a-s19/fp-glitching)

An application for researchers to glitch images, record insights and share the results. 

The link to [deployed application on Heroku](https://mysterious-beyond-74055.herokuapp.com/)

This repository combines the client and server into a single repository that can be co-developed, tested and ultimately deployed to Heroku or basin.cs.middlebury.edu.

The client was created with [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) and the server is a separate Node.js application. The client-server integration is based on this [tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [repository](https://github.com/fullstackreact/food-lookup-demo). This repository will be referred to as the "top-level" to distinguish it from the client and server.

## Installing (and Adding) Dependencies

The skeleton is structured as three separate packages. That is a "top-level" package and a separate "client" and "server". Thus initially installing dependencies is a 3 step process that runs "install" for each of the packages.

```
npm install
npm install --prefix client
npm install --prefix server
```

The `--prefix` option treats the supplied path as the package root. In this case it is equivalent to `cd client` then `npm install` then `cd ..`.

**You will typically not need to install any dependencies in the top-level `package.json` file**. Doing so is a common mistake. Most dependencies are needed by the client or the server and should be installed in the respective sub-packages, e.g. to install `reactstrap` for your client application:

```
npm install --save reactstrap --prefix client
```

**Other required dependencies for the client application are as follows:** @material-ui/core, @material-ui/icons, file-saver, glitch-canvas, jszip, react-google-login and bootstrap. These can be installed with the following commands run in your client directory: 

```
npm install --save @material-ui/icons && npm install --save @material-ui/core
npm install --save file-saver
npm install --save glitch-canvas
npm install --save file-saver
npm install --save jszip
npm install --save file-saver
npm install --save react-google-login
npm install --save bootstrap
```

## Running the Application

The combined application, client and server, can be run with `npm start` in the top-level directory. `npm start` launches the CRA development server on <http://localhost:3000> and the backend server on http://localhost:3001. By setting the `proxy` field in the client `package.json`, the client development server will proxy any unrecognized requests to the server. By default this starts the server in hot-reloading mode (like with the client application).

## Testing

The client application can be independently tested as described in the [CRA documentation](https://facebook.github.io/create-react-app/docs/running-tests), i.e.:

```
npm test --prefix client
```

The server can be similarly independently tested:

```
npm test --prefix server
```

## Linting

Both the client and server can be independently linted via:

```
npm run lint --prefix client
```

and

```
npm run lint --prefix server
```

To ensure consistent style we use the CRA-recommended [Prettier](https://github.com/prettier/prettier) package. We installed it in the "top-level" package with

```
npm install --save-dev husky lint-staged prettier
```

and added the recommended configuration to automatically reformat code during the commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the top-level `package.json` file. The client and server has its own ESLint configuration.

We added custom ESLint rules to capture common errors. To ensure compatibility with Prettier, we also installed the `eslint-config-prettier` package in both the client and server to disable styling rules that conflict with Prettier.

```
npm install --save-dev eslint-config-prettier --prefix server
npm install --save-dev eslint-config-prettier --prefix client
```

and added an `"extends"` entry to `.eslintrc.json`.

## Continuous Integration

The skeleton is setup for CI with Travis-CI. Travis will build the client and test and lint both the client and the server.

## Deploying to Heroku

Your application can be deployed to [Heroku](heroku.com) using the approach demonstrated in this [repository](https://github.com/mars/heroku-cra-node). The key additions to the top-level `package.json` file to enable Heroku deployment:

* Specify the node version in the `engines` field
* Add a `heroku-postbuild` script field that will install dependencies for the client and server and create the production build of the client application.
* Specify that `node_modules` should be cached to optimize build time

In addition a `Procfile` was added in the top-level package to start the server.

Assuming that you have a Heroku account, have installed the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and committed any changes to the application, to deploy to Heroku:

1. Create the Heroku app, e.g.:

    ```
    heroku apps:create
    ```

1. Push to Heroku

    ```
    git push heroku master
    ```

Depending on how you implement your server, you will likely need create "addons" for your database, etc. and migrate then seed your database before you deploy.

## Deploying to Basin

Your project can be deployed to basin.cs.middlebury.edu (where it is typically run within `screen` on an unused port). As with Heroku you will like need to create and seed your database before you deploy.

1. Build production assets for the client application (from the top-level directory):

    ```
    npm run heroku-postbuild
    ```

1. Start the server from the top-level directory (note you will need to pick a different, unused, port):

  	```
  	NODE_ENV=production PORT=5042 npm run start --prefix server
  	```
