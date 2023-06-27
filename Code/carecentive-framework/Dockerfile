# Build this image from the node:18-alphine
# alphin is a light-weight linux os
FROM node:19-alpine

# Set env vars
ENV MYSQL_HOST=localhost \
		MYSQL_DATABASE=dolphin_wet \
		MYSQL_USER=root \
		MYSQL_PASSWORD=Leon51059165 \
		JWT_TOKEN_SECRET=52dfaf8463d226a77ab11e78d9399d1ac27881fd939a828963f4ddc4e75d0d10184685f30cda753dd43f6df22e57c43d3b25446a28ed42520737e12a8c27ddca \
		HTTP_PORT=3001

# Copy file into container in the location /app/
COPY . /app/

# Set working directory
WORKDIR /app

# Install all dependencies
RUN npm install

# Expose the http port that the container listens on
# EXPOSE 3001

# Start the app
CMD [ "npm", "run", "start" ]