const hostname = window.location.origin.toString();
const APP_SERVICE = `${hostname}/api/wallet`;
const WALLET_APP_SERVICE = `${APP_SERVICE}/wallet`;

export const AUTH_API = `${APP_SERVICE}/auth`;
export const TRANSACTION_API = `${WALLET_APP_SERVICE}/transactions`;
export const ACCOUNT_API = `${WALLET_APP_SERVICE}/user-account`;
