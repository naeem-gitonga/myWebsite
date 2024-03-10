import { PaypalResult } from '@declarations/order';

export const orderReceived = (
  orderId: string,
  name: string,
  boughtConsult: boolean
) =>
  boughtConsult
    ? `<html>
    <div style="max-width: 1200px; margin: auto; padding: 50px; font-family: 'Roboto', sans-serif; background-color: #fff;">
      <div class="header-container" style="display: flex; justify-content: space-between;">
        <h1 class="logo-subtext" style="margin: auto ; color: black">You Made Money!</h1>
      </div>
  
      <div class="value-section" style="margin: 25px auto; max-width: 800px; font-size: 24px; margin-bottom: 0">
        <p style="color: black">
          ${name} has purchased from you. Check your calendar
        </p>
      <footer id="footer"></footer>
    </div>
  </html>`
    : `<html>
    <div style="max-width: 1200px; margin: auto; padding: 50px; font-family: 'Roboto', sans-serif; background-color: #fff;">
      <div class="header-container" style="display: flex; justify-content: space-between;">
        <h1 class="logo-subtext" style="margin: auto ; color: black">You Made Money!</h1>
      </div>
  
      <div class="value-section" style="margin: 25px auto; max-width: 800px; font-size: 24px; margin-bottom: 0">
        <p style="color: black">
          ${name} has purchased from you.
        </p>
  
        <p style="color: black; text-align: left; font-size: 14px; margin-bottom: 0;">
          Check PayPal<a href="https://www.paypal.com/unifiedtransactions/?filter=0&query=">PayPal</a> and reference this order ID: <strong style="font-weight">${orderId}</strong>.
        </p>
      <footer id="footer"></footer>
    </div>
  </html>`;
