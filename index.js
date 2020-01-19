const express                      = require('express');
// const morgan                       = require('morgan');
// const session                      = require('express-session');
// const bodyParser                   = require('body-parser');
// const methodOverride               = require('method-override');
const { port, env, sessionSecret } = require('./config/environment');
// const errorHandler                 = require('./lib/errorHandler');
const customResponses              = require('./lib/customResponses');
const routes                       = require('./config/routes');

const app = express();

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', `${__dirname}/public`);
app.use(express.static(`${__dirname}/public`));

// if(env !== 'test') app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(methodOverride((req) => {
//   if(req.body && typeof req.body === 'object' && '_method' in req.body) {
//     const method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));

// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: false
// }));

app.use(customResponses);
app.use(routes);
// app.use(errorHandler);
app.listen(port, () => console.log(`Express has started on port: ${port}`));
