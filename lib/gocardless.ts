import GoCardless from 'gocardless-nodejs';

const client = GoCardless(process.env.GOCARDLESS_ACCESS_TOKEN!, {
  environment: 'sandbox', // Use 'live' for production
});

export default client;