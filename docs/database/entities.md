# Database Entities

This document describes the entities currently required or planned for VirtualMentor.

The distinction between **Current MVP** and **Future** is intentional.

---

# 1. User

**Status:** Current MVP

The User entity represents the core identity of a VirtualMentor account.

## Responsibility

The User entity should answer:

> Who is this person?

It should not answer:

> What organization does this person belong to?

or:

> What role does this person have in an organization?

Those are separate concepts.

## Conceptual Fields

User
├── id
├── name
├── email
├── password / credential reference
├── createdAt
└── updatedAt