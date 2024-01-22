# Stage 1: Build the Node.js application
FROM node:latest as builder

# Go to Folder /app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

# Copy the application code
COPY . .

# Compile the application if necessary (e.g., TypeScript)
RUN npm run build

# Stage 2: Create an optimized production image
FROM node:current-alpine3.19

# Go to Folder /app
WORKDIR /app

# Copy files from the previous build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env

# Expose the application port (adjust the port according to your application)
EXPOSE 80

# Command to start the application
CMD ["node", "./dist/app.js"]