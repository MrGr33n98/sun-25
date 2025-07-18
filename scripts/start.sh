#!/bin/bash

# InsideSolar Start Script
set -e

echo "🚀 Starting InsideSolar application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Parse command line arguments
ENVIRONMENT=${1:-development}
DETACHED=${2:-false}

print_status "Starting environment: $ENVIRONMENT"

# Set the appropriate docker-compose file
if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
else
    COMPOSE_FILE="docker-compose.yml"
fi

# Check if .env file exists for production
if [ "$ENVIRONMENT" = "production" ] && [ ! -f ".env" ]; then
    print_warning "No .env file found for production. Creating template..."
    cat > .env << EOF
# Database
POSTGRES_DB=insidesolar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password-here

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# API
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
EOF
    print_warning "Please update the .env file with your actual values before running in production!"
    exit 1
fi

# Stop any running containers
print_status "Stopping any running containers..."
docker-compose -f $COMPOSE_FILE down

# Start the application
if [ "$DETACHED" = "true" ] || [ "$DETACHED" = "-d" ]; then
    print_status "Starting application in detached mode..."
    docker-compose -f $COMPOSE_FILE up -d
else
    print_status "Starting application in foreground mode..."
    docker-compose -f $COMPOSE_FILE up
fi

# Show application URLs
if [ "$DETACHED" = "true" ] || [ "$DETACHED" = "-d" ]; then
    echo ""
    print_status "✅ Application started successfully!"
    echo ""
    echo "Application URLs:"
    if [ "$ENVIRONMENT" = "production" ]; then
        echo "  Frontend: https://your-domain.com"
        echo "  API: https://your-domain.com/api"
    else
        echo "  Frontend: http://localhost:3000"
        echo "  API: http://localhost:3001/api"
        echo "  Nginx: http://localhost:80"
    fi
    echo ""
    echo "Useful commands:"
    echo "  View logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "  Stop application: docker-compose -f $COMPOSE_FILE down"
    echo "  Restart service: docker-compose -f $COMPOSE_FILE restart <service>"
fi

