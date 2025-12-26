# React Vite App for GitHub Pages Deployment

This is a React Vite application that can be deployed to GitHub Pages. Follow the instructions below to set up deployment.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update the base path in `vite.config.js`:**
   - If deploying to `https://username.github.io/repository-name/`, change the `base` property to `/repository-name/`
   - If deploying to `https://username.github.io/`, change the `base` property to `/`

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to the "Pages" section
   - Select "Deploy from a branch"
   - Choose the `main` branch and `/dist` folder as the source
   - Click "Save"

## Alternative: Using GitHub Actions for Automatic Deployment

Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

Then in GitHub repository settings:
- Go to "Pages" section
- Select source as "Deploy from a branch"
- Choose the `gh-pages` branch and `/` folder

## Running locally

To run the application locally for development:
```bash
npm run dev
```

## Notes

- The `dist` folder contains the production-ready build that should be served by GitHub Pages
- Make sure to update the `base` property in `vite.config.js` according to your repository name if deploying to a project page