# Database Documentation

This directory documents the database architecture and persistence strategy of VirtualMentor.

The database is responsible for storing durable application state that must survive application restarts and client changes.

## Current MVP Database Scope

The current database foundation is centered around:

- Users
- Authentication-related data
- User profile information
- Conversation/session data
- Conversation messages

The database design is intentionally kept extensible for future features such as:

- Organizations
- Organization memberships
- Roles
- Permissions
- Evaluations
- User progress
- Personalized mentoring

## Source of Truth

The database is the durable source of truth for application data.

For example, conversation history should not exist only inside:

- browser state
- mobile state
- an in-memory backend object
- an AI provider's context

Instead:

User
  |
  v
Backend
  |
  v
Database
  |
  +---- Conversation
  |
  +---- Message