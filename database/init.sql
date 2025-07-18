-- Initialize PostgreSQL database for InsideSolar
-- This script sets up the basic database structure

-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS analytics;

-- Set default search path
SET search_path TO public, auth, analytics;

-- Create basic indexes for performance
-- Additional tables and indexes will be created by Prisma migrations

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE insidesolar TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

