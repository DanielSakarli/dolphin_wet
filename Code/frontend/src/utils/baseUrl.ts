const NODE_ENV = 'development'; // or 'production'

export const baseUrl =
	NODE_ENV === 'production'
		? 'http://88395-17112.pph-server.de'
		: 'http://localhost:3309';
// Checks if we are in production or development. If in production it sends http requests
// to the server, if in development it sends http requests to localhost.
