# [Directory reader](https://OverCry.github.io/Reader)

A web page intended to display images in natural order. This was originally made in mine to read long strip, webtoon-like content which do not display well when they are not joined together.

## Goals

1. The webpage displays the uploaded content in natural order.
2. The webpage allows image scaling.
3. The webpage allows theme changes.
4. The webpage allows 'locations' to be saved.
5. The webpage allows drag-and-drop
6. The webpage allows youtube videos to be played on.

## Future Improvements

1. Allow more protection when deleting saved locations
2. Add content on the 'hidden' layer (Completed)
3. Allow 'pages' to jump, rather than next to each other

# Interesting Tech

Alongside trying to modify a previous project of using pure JS without any external packages, this repo is my experiment with some different packages I have found to be interesting

## [gh-pages](https://www.npmjs.com/package/gh-pages)

One of the things this repo is experimenting with is the package `gh-pages`, which has been suggested for deploying React-based projects as a GitHub page

### Steps

1. Install the package (using your preferred package manager)

```
npm install gh-pages --save-dev
```

2. Setup home directory in `package.json`

```
"homepage": "https://<username>.github.io/<projectname>
```

3. Add <b>predeploy</b> and <b>deploy</b> scripts in `package.json`

```
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```

4. When ready, check with `npm run build`
5. When successful, deploy with `npm run deploy`

## [husky](https://typicode.github.io/husky/)

This repo use Husky, which was something I spent some time implementing on my work repo. Personally, I always find that the steps I've used in the past will end up failing in some way. However, I have found the experience using it worth the effort in figuring out how to implement Husky into the particular project structure.

These particular steps were done with reference to this [guide](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9)

### Steps

1. Install relevant packages (using your preferred package manager)

```
npm init @eslint/config
npm i -D husky lint-staged prettier eslint-config-prettier
```

2. Add `.prettierrc`, `.eslintignore`, and `prettierignore` into the root director

3. Add files to ignore (node_modules, etc.) into the `*ignore` files prettier settings into `.prettierrc`. A sample would be 

```
{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "printWidth": 120,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

4. Initialize husky with `npx husky-init`

5. In `package.json`, add `"lint-staged": "lint-staged"` as a script, as well as 

```
  "lint-staged": {
    "*.{js, jsx,ts,tsx}": [
      "eslint --quiet --fix"
    ],
    "*.{json,js,ts,jsx,tsx,html}": [
      "prettier --write --ignore-unknown"
    ]
  },
```
into the file as well

6. Edit `.husky/pre-commit` and change the command to `npm run lint-staged`