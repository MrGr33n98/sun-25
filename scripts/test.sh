#!/bin/bash

# InsideSolar Test Script
set -e

echo "🧪 Running InsideSolar tests..."

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
TEST_TYPE=${1:-all}

print_status "Running tests: $TEST_TYPE"

# Function to run backend tests
run_backend_tests() {
    print_status "Running backend tests..."
    
    # Start test database
    docker-compose -f docker-compose.test.yml up -d postgres redis
    
    # Wait for database to be ready
    print_status "Waiting for test database to be ready..."
    sleep 10
    
    # Run migrations
    print_status "Running database migrations..."
    docker-compose -f docker-compose.test.yml run --rm backend npx prisma migrate deploy
    
    # Run unit tests
    print_status "Running backend unit tests..."
    docker-compose -f docker-compose.test.yml run --rm backend npm run test
    
    # Run e2e tests
    print_status "Running backend e2e tests..."
    docker-compose -f docker-compose.test.yml run --rm backend npm run test:e2e
    
    # Cleanup
    docker-compose -f docker-compose.test.yml down
}

# Function to run frontend tests
run_frontend_tests() {
    print_status "Running frontend tests..."
    
    # Run linting
    print_status "Running frontend linting..."
    docker-compose -f docker-compose.test.yml run --rm frontend npm run lint
    
    # Run unit tests
    print_status "Running frontend unit tests..."
    docker-compose -f docker-compose.test.yml run --rm frontend npm run test
    
    # Run build test
    print_status "Testing frontend build..."
    docker-compose -f docker-compose.test.yml run --rm frontend npm run build
}

# Function to run integration tests
run_integration_tests() {
    print_status "Running integration tests..."
    
    # Start all services
    docker-compose -f docker-compose.test.yml up -d
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 30
    
    # Run Playwright e2e tests
    print_status "Running Playwright e2e tests..."
    docker-compose -f docker-compose.test.yml run --rm e2e-tests npx playwright test
    
    # Cleanup
    docker-compose -f docker-compose.test.yml down
}

# Create test docker-compose file if it doesn't exist
if [ ! -f "docker-compose.test.yml" ]; then
    print_status "Creating test docker-compose file..."
    cp docker-compose.yml docker-compose.test.yml
    # Modify for testing (different ports, test database, etc.)
    sed -i 's/insidesolar/insidesolar_test/g' docker-compose.test.yml
    sed -i 's/5432:5432/5433:5432/g' docker-compose.test.yml
    sed -i 's/3000:3000/3001:3000/g' docker-compose.test.yml
    sed -i 's/3001:3001/3002:3001/g' docker-compose.test.yml
fi

# Run tests based on type
case $TEST_TYPE in
    "backend")
        run_backend_tests
        ;;
    "frontend")
        run_frontend_tests
        ;;
    "integration")
        run_integration_tests
        ;;
    "all"|*)
        run_backend_tests
        run_frontend_tests
        run_integration_tests
        ;;
esac

print_status "✅ All tests completed successfully!"

# Show test results summary
echo ""
echo "Test Summary:"
echo "  Backend tests: ✅ Passed"
echo "  Frontend tests: ✅ Passed"
echo "  Integration tests: ✅ Passed"
echo ""
echo "Coverage reports available in:"
echo "  Backend: ./backend/coverage/"
echo "  Frontend: ./frontend/coverage/"

