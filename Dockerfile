# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Run the app
CMD ["npm", "run",  "dev"]
