const hostname = window.location.origin.toString();
const WALLET_APP_SERVICE = `${hostname}/api/wallet`;

export const AUTH_API = `${WALLET_APP_SERVICE}/auth`;
export const TRANSACTION_API = `${WALLET_APP_SERVICE}/transactions`;
