const NODE_ENV = 'development'; // or 'production'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line prettier/prettier
export const baseUrl = NODE_ENV === 'production' ? 'https://88395-17112.pph-server.de' : 'http://localhost:3309';

// Checks if we are in production or development. If in production it sends http requests
// to the server, if in development it sends http requests to localhost.
