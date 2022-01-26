## Getting Started - Making It Yours

- make a copy of `webapp-config.example.js` and name it `webapp-config.js`
- fill in the config object's fields appropriately
- create a firebase project on https://firebase.google.com/ and follow the steps to setting up a web app, select realtime database, hosting, and storage during `firebase init`
- copy the firebase config from the firebase setup steps into `webapp-config.js` instead of into the codebase
- ensure firebase store is correctly created
- run `yarn dev` to ensure your website is properly setup
- go to `/home/edit` to edit the homepage and use your password
- go to `/blog/post/new` to create a new blog entry
- add `/edit` to an article's url to edit it
- in the editor page, drag files into the input text area to upload, an image tag will be added to it automatically on upload success.
- in the editor page, the body is used as markup and HTML syntax can be used.

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
