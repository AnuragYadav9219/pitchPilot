# System Architecture

## Overview

The system is organized around clients, a backend API, persistence, and an AI layer.

                    +----------------+
                    |     User       |
                    +-------+--------+
                            |
                 +----------+----------+
                 |                     |
          +------v------+       +------v------+
          |    Web      |       |   Mobile    |
          |   Client    |       |   Client    |
          +------+------+       +------+------+
                 |                     |
                 +----------+----------+
                            |
                     +------v------+
                     |   Backend   |
                     |     API     |
                     +------+------+ 
                            |
               +------------+------------+
               |                         |
        +------v------+           +------v------+
        |  Database   |           |  AI Layer   |
        +-------------+           +-------------+


## Architectural Principles

1. Keep clients independent from backend implementation details.
2. Keep domain logic separate from infrastructure.
3. Persist conversation state explicitly.
4. Keep AI integration behind a clear application boundary.
5. Avoid coupling roles to one specific organization type.
6. Design for future feature expansion without over-engineering the MVP.

## Evolution

The architecture should be updated whenever a major technical decision changes the system boundaries.
