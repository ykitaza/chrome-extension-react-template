# React Chrome Extension Template

This is a template for creating a Chrome extension using React and [Vite](https://vitejs.dev/) with TypeScript.


## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed on your machine.

### Setup

1. Clone or fork the repository :

    ```sh
    # To clone
    git clone https://github.com/5tigerjelly/chrome-extension-react-template
    cd chrome-extension-react-template
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## 🏗️ Development

To start the development server:

```sh
npm run dev
```

This will start the Vite development server and open your default browser.

## 📦 Build 

### For Chrome Extension

To create a production build for Chrome Extension:

```sh
npm run build
```

This will generate the build files in the `build` directory.

### For GitHub Pages

To create a production build for GitHub Pages:

```sh
npm run build:github
```

This will generate the build files in the `docs` directory.

## 🚀 Deploy to GitHub Pages

1. Run the GitHub Pages build:
   ```sh
   npm run build:github
   ```

2. Commit and push the generated `docs` directory to your repository.

3. Go to your repository settings on GitHub:
   - Navigate to "Pages"
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Click "Save"

Your app will be available at: `https://[your-username].github.io/chrome-extension-react-template/`

## 📂 Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle switch in the top right corner.
3. Click "Load unpacked" and select the `build` directory.

Your React app should now be loaded as a Chrome extension!

## 🗂️ Project Structure

- `public/`: Contains static files and the `manifest.json`.
- `src/`: Contains the React app source code.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Contains the project dependencies and scripts.

## License

This project is licensed under the MIT License.