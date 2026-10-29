# Audience Checkout Frontend

Frontend application developed for the Audience Checkout technical challenge.

The application implements a complete checkout flow with payment, success, and error pages, integrated with the Audience Checkout BFF.

## Features

- Product summary with price and description
- Credit Card payment
- Debit Card payment
- Pix payment with simulated QR Code
- Card form validation
- Simulated payment processing state
- Success and declined payment flows
- Route protection for success and error pages
- Shared checkout state between pages
- Responsive layout for desktop and mobile
- Internationalization with Portuguese and English support
- Integration with the checkout BFF through HTTP

## Required screens

The challenge requires three main pages:

- `/checkout/payment`
- `/checkout/success`
- `/checkout/error`

The success page is only available after an approved payment.
The error page is only available when a checkout error exists.

If either protected page is accessed directly without checkout state, the user is redirected to the payment page.

## Technology stack

- Angular 22
- TypeScript 6
- Tailwind CSS 4
- Reactive Forms
- Angular Signals
- Angular Router
- Angular HttpClient
- RxJS
- ngx-translate
- QRCode (`qrcode`)

### Styling

This project uses **Tailwind CSS** as the UI and responsive layout framework.

Tailwind is configured through PostCSS:

`.postcssrc.json`

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

The global stylesheet imports Tailwind with:

```css
@import "tailwindcss";
```

The application layout is primarily built with Tailwind utility classes directly in the Angular templates.

Bootstrap is not required by the application.

## Project structure

```text
src/app
├── core
│   ├── api
│   │   └── checkout-api.service.ts
│   ├── guards
│   │   ├── checkout-error.guard.ts
│   │   └── checkout-success.guard.ts
│   ├── models
│   └── services
│
├── features
│   └── checkout
│       ├── pages
│       │   ├── payment
│       │   │   └── components
│       │   │       ├── card-payment-form
│       │   │       ├── checkout-stepper
│       │   │       ├── payment-processing
│       │   │       └── pix-payment
│       │   ├── success
│       │   └── error
│       └── services
│           └── checkout-state.service.ts
│
└── shared
    └── components
```

## Architecture decisions

### Standalone Angular components

The project uses Angular standalone components instead of NgModules, following the current Angular application structure.

### Lazy-loaded routes

Checkout pages are loaded through `loadComponent`, reducing the initial route coupling and keeping route configuration simple.

### Reactive Forms

Card information is handled with Angular Reactive Forms because it provides explicit validation rules and predictable form state.

The card form validates:

- card number
- cardholder name
- expiration date
- CVV

The UI provides validation feedback before the checkout request is sent.

### Shared state with Angular Signals

Checkout state is stored in a dedicated service using Angular Signals.

The shared state contains information such as:

- cart ID
- products
- available payment methods
- selected payment method
- successful checkout result
- checkout error

Signals were selected because the checkout state is small and local to the application flow. A larger state management library such as NgRx would add unnecessary complexity for this challenge.

### Route guards

The success and error routes use dedicated guards.

- `checkoutSuccessGuard` only allows access after an approved payment.
- `checkoutErrorGuard` only allows access when an error exists in the checkout state.

Refreshing or directly navigating to these routes without valid state redirects the user back to `/checkout/payment`.

### Internationalization

The project uses `@ngx-translate/core`.

Translation files are available under:

```text
public/i18n/
├── pt-BR.json
└── en-US.json
```

Portuguese (`pt-BR`) is used as the main interface language, while English (`en-US`) is available as a fallback/secondary language.

The implementation code, class names, variable names, interfaces, and internal contracts are kept in English.

### BFF integration

The frontend communicates with the Audience Checkout BFF through:

```text
http://localhost:8080
```

The integration is isolated in:

```text
src/app/core/api/checkout-api.service.ts
```

Main endpoints:

```text
POST /operations/pre-checkout
POST /operations/checkout
```

## Requirements

Before running the frontend, install:

- Git
- Node.js 22.22.3 or newer
- npm

The BFF should also be running locally on port `8080` for the complete checkout flow.

Backend repository:

```text
https://github.com/eduardopinheiro20/audience-checkout-bff
```

## Running on Linux

### 1. Clone the repository

```bash
git clone https://github.com/eduardopinheiro20/audience-checkout-frontend.git
cd audience-checkout-frontend
```

### 2. Check Node.js and npm

```bash
node --version
npm --version
```

Node.js must be version `22.22.3` or newer.

If Node.js is already configured with NVM, select the appropriate version before installing dependencies.

### 3. Install dependencies

```bash
npm install
```

This command installs Angular, Tailwind CSS, ngx-translate, QRCode, and all other project dependencies defined in `package.json`.

No separate Tailwind installation is required after `npm install`.

### 4. Start the application

```bash
npm start
```

Open:

```text
http://localhost:4200
```

## Running on Windows

The application can be executed from PowerShell, Windows Terminal, or Command Prompt.

### 1. Clone the repository

```powershell
git clone https://github.com/eduardopinheiro20/audience-checkout-frontend.git
cd audience-checkout-frontend
```

### 2. Check Node.js and npm

```powershell
node --version
npm --version
```

Node.js must be version `22.22.3` or newer.

If Node.js is not installed, install a current Node.js version compatible with this requirement and reopen the terminal.

### 3. Install dependencies

```powershell
npm install
```

Tailwind CSS and all required packages are installed automatically from `package.json`.

### 4. Start the application

```powershell
npm start
```

Open:

```text
http://localhost:4200
```

## Running the complete solution

For the complete flow, run both projects:

### Backend

```text
http://localhost:8080
```

### Frontend

```text
http://localhost:4200
```

The frontend expects the backend to be available at `http://localhost:8080`.

## Available npm commands

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Run the build in watch mode:

```bash
npm run watch
```

## Payment scenarios

### Successful card payment

Use a valid simulated card number, for example:

```text
4111 1111 1111 4242
```

The frontend removes visual spaces from the card number before sending the request to the backend.

### Declined card payment

Any card ending in `0002` is declined by the BFF, for example:

```text
4111 1111 1111 0002
```

This scenario redirects the user to the error page and demonstrates the expected declined-payment flow.

### Pix

Selecting Pix generates a simulated Pix code and QR Code.

The payment is processed through the same checkout flow without using a real payment provider.

## Responsive behavior

The layout was designed to work on desktop and mobile devices.

On desktop:

- payment information is displayed on the left
- order summary is displayed on the right

On mobile:

- order summary is displayed first
- payment information is displayed below it

Tailwind responsive breakpoints are used to control these layouts.

## Error handling

Business errors returned by the BFF follow a stable error contract.

The frontend stores the error state and redirects the user to the error page, where the user can:

- retry the payment
- return to the payment step and choose another payment method

## Security considerations

This application is a technical challenge and does not integrate with a real payment gateway.

Card data is used only to simulate the checkout request.
The backend does not persist the full card number or CVV.

No real card information should be used when testing the application.

## Decisions and scope

The implementation prioritizes the requirements of the technical challenge while keeping the solution simple and avoiding unnecessary complexity.

Included:

- Angular standalone architecture
- reusable components
- Reactive Forms
- route guards
- Angular Signals
- responsive Tailwind layout
- internationalization
- BFF integration
- simulated Pix QR Code
- success and error flows

Not included:

Some decisions were intentionally made to keep the solution focused on the checkout flow and avoid unnecessary complexity:

- NgRx was not used because the checkout state is small and limited to a single feature. Angular Signals with a shared service were enough to keep the state simple and predictable.
- No real payment gateway was integrated because the challenge requires a simulated checkout flow. The backend already provides deterministic success and decline scenarios for the frontend.
- Frontend state is not persisted after refresh. Success and error routes are protected by guards and redirect to the payment page when there is no valid checkout state, which matches the expected behavior for the challenge.
- Authentication was not implemented because the proposed flow does not depend on an authenticated user. Adding authentication would not improve the core checkout requirements being evaluated.
- Bootstrap was not used. The interface was implemented with Tailwind CSS to keep styling consistent, responsive and component-focused.
- The payment flow was kept intentionally simple. The focus was on form validation, shared state, API integration, route protection and clear success/error handling rather than reproducing a complete production payment platform.

## Author

Eduardo Pinheiro
