# Database Setup Instructions

## Option 1: Docker (Recommended)
1. Install Docker Desktop from https://www.docker.com/products/docker-desktop
2. Run: `docker-compose up -d postgres`
3. The PostgreSQL database will be available at localhost:5432

## Option 2: Local PostgreSQL Installation
1. Download PostgreSQL from https://www.postgresql.org/download/
2. Install with the following settings:
   - Username: postgres
   - Password: postgres
   - Port: 5432
3. Create database: `createdb pfms_db`

## Option 3: Cloud Database (Production)
- Set up PostgreSQL on AWS RDS, Google Cloud SQL, or Azure Database
- Update .env file with cloud database credentials

## After Database Setup
1. Uncomment TypeORM configuration in src/app.module.ts
2. Uncomment AuthModule import in src/app.module.ts  
3. Run: `npm run migration:run`
4. Start application: `npm run start:dev`
