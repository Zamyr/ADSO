# Take Home Coding Challenge - Backend Engineering

## Overview

Build a user profile service that handles profile CRUD operations. [cite_start]Should be deployable and handle ~10 requests/second. [cite: 4]

## Prerequisites

* [cite_start]You may use any programming language, framework, and storage solutions you wish [cite: 7]
* [cite_start]Your project must be buildable and runnable from the command line via cURL requests [cite: 8]
* [cite_start]Please include step-by-step instructions on how to do so, we value portability and ease of use. [cite: 9]
* [cite_start]A ReadMe.md file should be added to the root of your solution with adequate documentation to setup and run your solution. [cite: 10]
* [cite_start]Please include instructions on how to run tests in your project [cite: 11]
* [cite_start]The service must be accessible via cURL [cite: 12]
* [cite_start]If you used Claude (or any Al) to help build this, please include your CLAUDE.md context file. [cite: 13]
* [cite_start]Submit a compressed file of your project before your onsite interview panel [cite: 14]
* Also note:
    * [cite_start]Email the compressed project back to us [cite: 16]
    * [cite_start]We will walk through your code during a portion of the on-site interview [cite: 17]
    * [cite_start]We are looking to understand how you solve problems [cite: 18]

## What We're Looking For

* [cite_start]Working implementation [cite: 20]
* [cite_start]Clean code with reasonable architecture [cite: 21]
* [cite_start]Your thought process [cite: 22]
* [cite_start]Error handling and basic validation [cite: 23]

## Requirements

Design and implement a simple user profile service that must:

* [cite_start]Be ready for production deployment. [cite: 26]
* [cite_start]Scale horizontally. [cite: 27]
* [cite_start]Use HTTP. [cite: 28]
* [cite_start]Handle at least 10 requests/second for reads and writes. [cite: 29]
* [cite_start]Adhere to the API contract specified in the following sections. [cite: 30]

## API Contract

### POST /profiles

[cite_start]Create a user profile. [cite: 33]

[cite_start]The following table: [cite: 34]

| Name | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| username | String | The user name | yes |
| email | String | The email of the user | yes |
| Bio | Text | Small bio of the user | No |

[cite_start]**Response properties:** [cite: 35]

* [cite_start]Status code of 201 Created [cite: 36]
* [cite_start]A body with JSON containing the ID of the newly-created message [cite: 37]
* [cite_start]Example response body: [cite: 38]
    ```json
    {"id": 1234}
    ```
    [cite_start][cite: 44]

### GET /profile/{id}

[cite_start][cite: 39]
[cite_start]**Response properties:** [cite: 40]

* [cite_start]A 200 status code [cite: 41]
* [cite_start]A JSON object with the profile [cite: 42]
* [cite_start]Example response body: [cite: 43]
    ```json
    { "id": "123", "username": "john_doe", "email": "john@example.com", "bio": "Software engineer", "created_at": "2025-11-09T10:30:00Z"}
    ```
    [cite_start][cite: 46]

### GET /profiles

[cite_start][cite: 45]
[cite_start]List all profiles (no pagination required, but think about it). [cite: 47]

### PATCH /profile/{id}

[cite_start][cite: 48]
[cite_start]Update profile fields. [cite: 49]

## Follow Up Questions

[cite_start]Given your implementation, summarize how your solution could scale to millions of daily users and 1000 requests/second split evenly between reads and writes. [cite: 51]

[cite_start]Consider the following: [cite: 52]

* [cite_start]Data persistence / caching [cite: 54]
* [cite_start]Portability [cite: 55]
* [cite_start]Scalability [cite: 56]
* [cite_start]Testability [cite: 57]
* [cite_start]Framework implementation details [cite: 58]

[cite_start]Additionally, consider the following: [cite: 59]

* [cite_start]What questions might you have for product owners that could clarify or inform the need to scale your service? [cite: 60]
* What technologies would you pick? [cite_start]Why? [cite: 61]
* What would you keep in your service? [cite_start]What might you change? [cite: 62]
* [cite_start]How would you monitor your service? [cite: 63]
* [cite_start]How would you secure and protect your service? [cite: 64]
* [cite_start]What improvements would you recommend for future development of this service? [cite: 65]