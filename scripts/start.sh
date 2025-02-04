#!/bin/bash

# Start the Next.js application
cd /root/app
npm run dev &

# Wait for the application to start
echo "Starting DevOS environment..."
sleep 5

# Configure terminal environment
cd /root/workspace
echo "export TERM=xterm-256color" >> ~/.bashrc
echo "export PATH=$PATH:/usr/local/bin" >> ~/.bashrc
source ~/.bashrc

# Keep the container running
tail -f /dev/null
