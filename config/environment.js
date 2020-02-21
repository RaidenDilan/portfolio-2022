const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';

module.exports = { port, env, sessionSecret };
