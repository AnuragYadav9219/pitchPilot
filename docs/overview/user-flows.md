# User Flows

## Authentication Flow

User
  |
  v
Register / Login
  |
  v
Authentication
  |
  v
Access Token
  |
  v
Authenticated Application


## Conversation Flow

User
  |
  v
Select or Start Context
  |
  v
Send Message
  |
  v
Backend
  |
  +--> Load Conversation History
  |
  +--> Build AI Context
  |
  +--> Generate AI Response
  |
  v
Persist Conversation
  |
  v
Return Response


## Future Organization Flow

User
  |
  v
Organization
  |
  v
Membership
  |
  v
Role
  |
  v
Organization-specific capabilities


The organization and role model is intentionally kept flexible so the same user can participate in different organizational contexts in the future.
