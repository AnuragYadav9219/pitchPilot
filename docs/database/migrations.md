# Database Migrations

## Purpose

Database migrations provide a version-controlled history of changes to the VirtualMentor database schema.

Instead of manually changing production tables, schema changes should be represented as migrations.

## Migration Flow

Code Change
    ↓
Entity / Schema Change
    ↓
Migration
    ↓
Test Migration
    ↓
Deploy Migration
    ↓
Deploy Compatible Application