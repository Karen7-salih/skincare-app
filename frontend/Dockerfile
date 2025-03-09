# Use the latest Node.js image
FROM node:22.13-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy all files
COPY . .

# Expose Vite's default port
EXPOSE 3000

# Start Vite development server
# CMD ["npm", "run", "dev", "--", "--host"]


# CMD ["npm", "start","--port", "0.0.0.0" , "uvicorn" , "main:reload"]

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

