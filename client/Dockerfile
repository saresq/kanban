# Dockerfile for React client with Vite

# Use node base image with alpine
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
