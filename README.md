# React router framework template

This is a template for building React applications with [React Router](https://reactrouter.com/) and [Vite](https://vitejs.dev/).

**The main goal of this project is to be about to develop a system with AI Agents**

## Features

- This template comes with a prisma database client preconfigured
- It has a simple auth system using [bcrypt](https://www.npmjs.com/package/bcrypt) 
- It uses [Tailwind CSS](https://tailwindcss.com/) for styling
- It has a register and login system, a profile page, and a protected route setup


- 📖 [React Router docs](https://reactrouter.com/docs/en/v6)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in React app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
