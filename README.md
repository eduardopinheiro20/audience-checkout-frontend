# Audience Checkout Frontend

Angular frontend for the Audience Checkout technical challenge.

## Purpose

This repository contains the three required checkout screens:

- Payment
- Success
- Error

The initial commit focuses on architecture, routing, reusable boundaries, and a clean folder structure. Business behavior will be added incrementally in later commits.

## Stack

- Angular 22
- TypeScript 6
- RxJS
- Bootstrap
- Reactive Forms
- HttpClient
- Signals for local checkout state

## Initial architecture

```text
src/app
├── core
│   ├── api
│   ├── guards
│   ├── models
│   └── services
├── shared
│   └── components
└── features
    └── checkout
        ├── components
        ├── pages
        │   ├── payment
        │   ├── success
        │   └── error
        └── services
```

## Why this structure?

- `core`: application-wide integrations and infrastructure.
- `shared`: reusable presentation components.
- `features`: business-facing functionality.
- pages orchestrate the screen;
- reusable components focus on presentation;
- API calls will be isolated in a dedicated service;
- checkout state will be isolated from page components.

## Run locally

Environment setup will be done in the next step.

```bash
npm install
npm start
```

The application will run on `http://localhost:4200`.

## Initial commit suggestion

```text
chore: initialize audience checkout frontend structure
```
