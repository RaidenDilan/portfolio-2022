const express                      = require('express');
const morgan                       = require('morgan');
const session                      = require('express-session');
const bodyParser                   = require('body-parser');
const methodOverride               = require('method-override');
const { port, env, sessionSecret } = require('./config/environment');
const errorHandler                 = require('./lib/errorHandler');
const customResponses              = require('./lib/customResponses');
const routes                       = require('./config/routes');
const dest                         = `${__dirname}/public`;

// create an express app
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', `${dest}/views`);

// set up our static files folder
app.use(express.static(dest));

// set up middleware
if(env !== 'test') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// set up our sessions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// set up custom middleware - requires flash
app.use(customResponses);

// set up our routes - just BEFORE our error handler
app.use(routes);

// set up errorHandler - our LAST piece of middleare
app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
