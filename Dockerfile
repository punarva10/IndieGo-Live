# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.17.0
ARG PNPM_VERSION=9.8.0
FROM node:${NODE_VERSION}-alpine

# Install pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the source files into the image
COPY . .

# Change ownership of the app directory to the node user
RUN chown -R node:node /usr/src/app

# Run the application as a non-root user
USER node

# Expose the port that the application listens on
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "dev"]