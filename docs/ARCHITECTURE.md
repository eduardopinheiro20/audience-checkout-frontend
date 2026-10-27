# Frontend Architecture

```text
Route
  ↓
Page component
  ↓
Feature state / API facade
  ↓
Core API service
  ↓
BFF
```

## Responsibilities

### Pages
Orchestrate screen state and user actions.

### Feature components
Render reusable parts of the checkout and emit user intent.

### CheckoutStateService
Owns client-side checkout state.

### CheckoutApiService
Owns HTTP communication with the BFF.

### AnalyticsService
Abstracts tracking so the UI does not depend directly on GA/GTM.

### Guards
Protect success/error pages when the required checkout state is missing.
