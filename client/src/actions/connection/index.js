// Action Types

export const CONNECT = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECT = 'DISCONNECT';
export const DISCONNECTED = 'DISCONNECTED';

// Actions

export function connect() {
  return { type: CONNECT };
}

export function onConnected() {
  return { type: CONNECTED };
}

export function disconnect() {
  return { type: DISCONNECT };
}

export function onDisconnected() {
  return { type: DISCONNECTED };
}
