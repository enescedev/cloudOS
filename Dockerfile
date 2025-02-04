# STAGE 1 - Build Next.js Application
FROM node:18-alpine AS builder

# Install dependencies for node-gyp
RUN apk add --no-cache python3 make g++ git

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# STAGE 2 - Development Image with Terminal Support
FROM ubuntu:22.04

# System dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    tmux \
    vim \
    openssh-client \
    bash \
    wget \
    gnupg \
    sudo \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Setup Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Create workspace and setup shell environment
WORKDIR /root
RUN mkdir -p workspace app && \
    echo "export PATH=$PATH:/usr/local/bin" >> /root/.bashrc && \
    echo "export PS1='\[\033[01;32m\]\u@devos:\[\033[01;34m\]\w\[\033[00m\]\$ '" >> /root/.bashrc && \
    echo "cd /root/workspace" >> /root/.bashrc

# Copy application files and setup permissions
COPY --from=builder /app ./app/
RUN chown -R root:root /root && \
    chmod -R 755 /root

# Setup development tools
COPY scripts/start.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start.sh

WORKDIR /root/app
RUN npm install

# Expose port
EXPOSE 3000

# Start application and shell
ENTRYPOINT ["/usr/local/bin/start.sh"]