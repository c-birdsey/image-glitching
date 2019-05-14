# Image Glitching Server

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:3001>. Alternately, to enable hot reloading of changes to the server, you can use `npm run watch`. In general, though, you should launch the client and server concurrently from the "top-level" package.

## Setup

You should install the dependencies from the "top-level" package as described in its README or via `npm install` in this directory.

```
npm install --save express
npm install --save cors
npm install --save body-parser
npm install --save knex
npm install --save objection
npm install --save express-session
npm install --save passport
npm install --save passport-http-bearer
npm install --save google-auth-library
npm install --save objection
npm install --save multer
npm install --save cloudinary
npm install --save multer-storage-cloudinary
```

## Development

You should register for [Cloudinary](https:/https://cloudinary.com) and set the enviroment variable ```CLOUDINARY_URL``` appropriately.

### Testing with Jest

The server is configured for testing with the Jest test runner. Tests can be run with:

```
npm test
```

### Linting with ESLint

The server is configured with the [AirBnB ESLint rules](https://github.com/airbnb/javascript). You can run the linter with `npm run lint` or `npx eslint .`. The rules were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
npm install --save-dev eslint-config-prettier
```

and `.eslintrc.json` configured with:

```
{
  "extends": ["airbnb-base", "prettier",
  "env": {
    "jest": true
  }
}
```

The linter can be run with `npx eslint .` (or via `npm run lint`). Include the `--fix` option to `eslint` to automatically fix many formatting errors.
