#!/bin/bash

# InsideSolar Build Script
set -e

echo "🚀 Starting InsideSolar build process..."

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

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Parse command line arguments
ENVIRONMENT=${1:-development}
BUILD_TYPE=${2:-full}

print_status "Building for environment: $ENVIRONMENT"
print_status "Build type: $BUILD_TYPE"

# Set the appropriate docker-compose file
if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
else
    COMPOSE_FILE="docker-compose.yml"
fi

# Build based on type
case $BUILD_TYPE in
    "frontend")
        print_status "Building frontend only..."
        docker-compose -f $COMPOSE_FILE build frontend
        ;;
    "backend")
        print_status "Building backend only..."
        docker-compose -f $COMPOSE_FILE build backend
        ;;
    "full"|*)
        print_status "Building all services..."
        docker-compose -f $COMPOSE_FILE build
        ;;
esac

# Generate Prisma client if building backend
if [ "$BUILD_TYPE" = "backend" ] || [ "$BUILD_TYPE" = "full" ]; then
    print_status "Generating Prisma client..."
    docker-compose -f $COMPOSE_FILE run --rm backend npx prisma generate
fi

print_status "✅ Build completed successfully!"

# Show next steps
echo ""
echo "Next steps:"
echo "  To start the application: ./scripts/start.sh $ENVIRONMENT"
echo "  To run tests: ./scripts/test.sh"
echo "  To deploy: ./scripts/deploy.sh $ENVIRONMENT"

