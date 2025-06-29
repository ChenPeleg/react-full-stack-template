# Common React 0.1.10

The goal of this package is not to be installed!

This package is a collection of common React components and utilities that are used across multiple projects. It is not meant to be installed as a dependency, but rather to be copied and pasted into new projects as needed.

Just take the component you need and paste it into your project. You can then modify it as needed.


# Use cases 

I would recommend using this package in the following cases:

- You are doing a side project that will take some years, and you don't want to depend on a package that may be abandoned.
- You are working on a project and don't want to depend on visual packages that needs to be tweaked

I would not recommend using this package in the following cases:
- big projects 
- projects that need to be maintained by a team of developers
- projects that need to be updated frequently


# Setup 

The basic set that is used by the package is the follow.

> important: the following is a template and should can modified to almost any react project.


> **The only things you need are:**
> - React 18^
> - Tailwind CSS

The rest including Typescript, ESLint, Prettier, and Vite are optional, at least for the basic setup.



Requirements:

- Node.js v20.x

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

run the following command to build the application:

```bash
npm run build
```

The build will create a `dist` directory with the built files.

## Testing

Based on the current configuration, the unit tests are run using Vitest.
To run the tests, run the following command:

```bash
npm run test
```

# Development tools and features

## Typescript

The application is built using Typescript. The types are defined in the `src/modles` directory.
`explicit any` is allowed in the codebase.

## Linting and formatting

- eslint is used for linting the code.
- prettier is used for code formatting (prettier is defined as an eslint plugin).
- vite is used as the build tool. The configuration is defined in the `vite.config.js` file. The different environments
  are
  defined in the `env` files such as `env.development` and `env.production`.

## App Configuration file

The app configuration file is located in the `src/configuration` directory.
The configuration file is uses the values from the `env` files and return a configuration object.

## Style

- Some of the components mainly buttons and inputs are styled using Tailwind CSS.
- Some component are styled using CSS modules - usually the more complex / experimental styles.
- some styles are still exprimental like the `@starting-style`, and components that use the native html `modal`
  and `popover`.

