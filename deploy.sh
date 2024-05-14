#!/bin/bash

# Change directory to client
cd client || exit

# Install dependencies
npm install

# Build the React app
npm run build

# Return to the root folder
cd ..

# Install server dependencies
npm install
