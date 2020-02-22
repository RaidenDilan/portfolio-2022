const express = require('express');
const port = process.env.PORT || 4000;
const router = require('./config/routes');

const app = express();

// app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
// app.set('view engine', 'html');
app.set('views', `${__dirname}/public`);

app.use(express.static(`${__dirname}/public`));

app.use(router);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
