# Use the official Node.js image
FROM node:latest

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]