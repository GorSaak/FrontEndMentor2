# Use official Nginx image as base
FROM nginx:alpine

# Copy static files to Nginx server directory
COPY age-calculator-app-main /usr/share/nginx/html

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

