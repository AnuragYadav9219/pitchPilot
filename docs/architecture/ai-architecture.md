# AI Architecture

## Purpose

The AI layer provides contextual responses while keeping conversation state outside the model itself.

## High-Level Flow

User Message
     |
     v
Conversation Service
     |
     +--> Load Conversation
     |
     +--> Load Relevant History
     |
     +--> Build AI Context
     |
     v
AI Provider / Model
     |
     v
AI Response
     |
     +--> Persist Message
     |
     v
Client

## Conversation Context

Conversation history is a first-class part of the application.

The system should distinguish between:

- Current user message
- Current conversation
- Previous messages
- System instructions
- User/context information
- Future long-term memory

## Redis

Redis should not automatically become the source of truth for conversation history.

The durable database should remain responsible for persisted conversation data.

Redis can be introduced when there is a concrete need such as:

- Short-lived caching
- Rate limiting
- Session-oriented state
- Frequently accessed context
- Background job coordination

This keeps the MVP simpler while leaving room for performance optimization later.


# Final MVP AI architecture

                       REST API
                          │
                          ▼
                ConversationController
                          │
                          ▼
                ConversationService
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
       Conversation DB          ContextBuilder
             │                         │
             │                  summary + history
             │                         │
             └────────────┬────────────┘
                          ▼
                       AiService
                          │
                          ▼
                  Provider Registry
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
       Gemini           OpenAI         Anthropic
       Provider         Provider        Provider
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                     AI Response
                          │
                          ▼
                ConversationMessage
                          │
                          ▼
                      PostgreSQL




# Conversation Service

                 ConversationService
                         │
             ┌───────────┴───────────┐
             │                       │
       MessageRepository       ContextBuilder
             │                       │
       Recent N messages        AI context
             │                       │
             └───────────┬───────────┘
                         ↓
                     AiRequest
                         ↓
                     AiService
                         ↓
                 Provider Registry
                         ↓
                  Gemini Provider
                         ↓
                    Gemini API