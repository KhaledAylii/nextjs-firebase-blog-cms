## Getting Started - Making It Yours

- make a copy of `webapp-config.example.js` and name it `webapp-config.js`
- fill in the `config` object's fields appropriately
- create a firebase project on https://firebase.google.com/ and follow the steps to setting up a web app, select realtime database during `firebase init`
- copy the firebase config from the firebase setup steps into `webapp-config.js` instead of into the codebase
- run `yarn dev` to ensure your website is properly setup

## Editing and Creating Content

- go to `/home/edit` to edit the homepage and use your password
- go to `/blog/post/new` to create a new blog entry
- add `/edit` to an article's url to edit it
- !!! keep in mind all these changes will take up to 60 seconds to go into effect !!!
- in the editor page click on authorize with imgur first if you plan on uploading a cover image or drag and drop into the body, otherwise it wont work, and clicking on this will remove any unsaved changes
- in the editor page, drag files into the input text area to upload, an image tag will be added to it automatically on upload success.
- in the editor page, the body is used as markup and HTML syntax can be used.

## Deploying

- push your changes from above to your forked repo on github
- go to https://vercel.com/
- link your github account and repo
- let it build
- voila.
- (BONUS: you can use a custom domain in settings. Instructions: https://vercel.com/docs/concepts/projects/custom-domains)

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Calling open source enthusiasts

If you have a few hours to tighten the security by abstracting the webapp-config contents that would be ideal (hint: you can use the api routes pattern with Nextjs here https://nextjs.org/learn/basics/api-routes)
