# Database Schema

## Overview

The VirtualMentorr database is designed around a user-centric model.

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