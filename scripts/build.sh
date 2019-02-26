#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print shell input lines as they are read
set -v

# Clean build dist folder
rm -rf dist && mkdir dist

# Build assets
npm run build:webpack

# Copy package.json
cp package.json dist/

# Copy postcss.plugins.js
cp postcss.plugins.js dist/

npm install --production --prefix dist

# Transpile
npx babel src --out-dir dist/src --source-maps true --ignore "**/*.spec.js"
npx babel server --out-dir dist/server --source-maps true
npx babel config --out-dir dist/config --source-maps true

# Copy css and json files
find src -name '*.css' -exec rsync -R '{}' dist ";"
