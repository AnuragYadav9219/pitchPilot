# Database Schema

## Overview

The VirtualMentor database is designed around a user-centric model.

The current MVP can be represented conceptually as:

                         +-------------+
                         |    User     |
                         +------+------+
                                |
                  +-------------+-------------+
                  |                           |
          +-------v-------+           +-------v-------+
          | Conversation  |           | Auth Data     |
          +-------+-------+           +---------------+
                  |
          +-------v-------+
          |    Message    |
          +---------------+