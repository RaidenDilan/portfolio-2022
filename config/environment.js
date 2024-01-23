const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const secret = process.env.SECRET || '🤫';

const isDevEnv = () => env === 'development';

module.exports = { port, env, secret, isDevEnv };