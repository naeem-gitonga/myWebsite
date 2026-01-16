# PayPal SDK v6 Migration Guide

## Current Implementation
- **Package:** `@paypal/paypal-js` v9.1.0
- **Pattern:** v5-style (`loadScript()` + `paypal.Buttons()`)
- **Main file:** `utils/paypal.ts`

## v6 Breaking Changes

### 1. SDK Initialization
```typescript
// v5 (current)
const paypal = await loadScript({ clientId: 'YOUR_CLIENT_ID' });

// v6 (new) - requires server-generated clientToken
const sdkInstance = await window.paypal.createInstance({
  clientToken,  // Must be fetched from your backend
  components: ['paypal-payments'],
  pageType: 'checkout',
});
```

### 2. Order Creation Return Format
```typescript
// v5 (current) - returns order ID directly
return actions.order.create({ purchase_units });

// v6 (new) - must return object
return { orderId: id };
```

### 3. Button Rendering
```typescript
// v5 (current)
paypal.Buttons({ createOrder, onApprove }).render('#container');

// v6 (new) - web components + payment sessions
const session = sdkInstance.createPayPalOneTimePaymentSession({
  onApprove: async ({ orderId }) => { /* capture */ },
  onCancel: () => { /* handle */ },
  onError: (err) => { /* handle */ },
});
```

### 4. Eligibility Check (New Requirement)
```typescript
const methods = await sdkInstance.findEligibleMethods({ currencyCode: 'USD' });
if (methods.isEligible('paypal')) {
  // render button
}
```

## Files to Modify
1. **`utils/paypal.ts`** - Rewrite SDK init, button rendering, order creation
2. **Backend** - New endpoint to generate client tokens
3. **`components/CartView/CartView.tsx`** - Update button container

## Backend: Client Token Endpoint
Add a new endpoint to generate client tokens:

```typescript
// POST /paypal/client-token
const response = await fetch('https://api.paypal.com/v1/identity/generate-token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
    'Content-Type': 'application/json'
  }
});
const { client_token } = await response.json();
return { clientToken: client_token };
```

## v6 Presentation Modes
| Mode | Use Case |
|------|----------|
| `auto` | Recommended - tries popup, falls back to modal |
| `popup` | Seamless but subject to popup blockers |
| `modal` | Webview scenarios only |
| `redirect` | Mobile devices with return URLs |

## Reference
- [PayPal JS SDK v6 Docs](https://docs.paypal.ai/payments/methods/paypal/sdk/js/v6/paypal-checkout)
