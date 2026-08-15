# Application Architecture

## Layers

The backend should be organized around clear responsibilities:

Controller / API
       |
       v
Application / Service
       |
       v
Domain / Business Logic
       |
       +---------> Persistence
       |
       +---------> AI Integration

## Responsibilities

### API Layer

Handles:

- HTTP requests
- Validation
- Authentication context
- Response mapping

### Application Layer

Handles:

- Use cases
- Transaction boundaries
- Coordination between services

### Domain Layer

Handles:

- Business rules
- Domain state
- Core application behavior

### Infrastructure

Handles:

- Database access
- External AI providers
- Email or other integrations
- Infrastructure-specific concerns

The exact package structure should follow the current codebase rather than being duplicated across multiple documentation files.
