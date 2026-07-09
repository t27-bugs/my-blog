---
title: "My First Bug Bounty: An IDOR in an AI Chat History"
date: "2026-04-02"
description: "My first bug bounty"
tags: ["IDOR", "web-security"]
---

## Short intro

Websites need to know which AI chat belongs to which user. Often, they use an ID to identify a specific conversation. There is nothing wrong with using IDs, as long as the backend checks whether the current user is allowed to access that conversation.

This is where object-level authorization becomes important.

## Main explanation

When a user chats with an AI system, the application needs a way to load the correct conversation history. One common way to do this is by using a conversation ID.

```json
{
    "conversationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

At first, this may look safe, especially if the ID is long and random. But a random ID is not the same as an authorization check.

The important question is not only:

“Is this ID hard to guess?”

The real question is:

“Does the backend check that this conversation belongs to the current user?”

In my case, replacing my conversation ID with another user’s conversation ID in the request allowed one user to access another user’s AI chat history. The issue was not that the ID was easy to guess. The issue was that the backend trusted the supplied ID without properly checking ownership.

## What I learned

This bug taught me that new features often introduce new access control risks even in popular websites.

Finding this bug early in my bug bounty journey helped me to stick to bug bounty hunting, because I was just starting and full of motivation. I learned that UUIDs can reduce guessing, but they do not replace proper ownership checks.