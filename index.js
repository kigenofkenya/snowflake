const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan') // remove for production
const appRoot = path.resolve(__dirname)
const CONFIG= require(path.resolve(appRoot,'config','default'));
const { SRV_PORT, APP_NAME } = CONFIG
const PORT = process.env.PORT || SRV_PORT
const qData= require(path.resolve(appRoot,'api','quench','q-data.js'));
const qrData= require(path.resolve(appRoot,'api','quench','qr-data.js'));

const app = express();
// fixes
app.disable('x-powered-by')
app.locals.title = APP_NAME;
// app.locals.strftime = require('strftime');
app.locals.email = 'a.nzibo@gmail.com';
app.locals.public =  path.resolve(appRoot, 'public')
app.locals.ioBIN = path.resolve(appRoot,'ioBIN')
// dev additions // should be conditined out for production
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(app.locals.public))
  .use( favicon( path.join(app.locals.public,'favicon.ico') ) )
  .use('/ioBIN', express.static(app.locals.ioBIN))
  .set('views', path.join(appRoot, 'views'))
  .set('view engine', 'ejs')
// ejs or pug? pug is simpler but ejs is more real
// main app logic goes here, firebase,sockets,route objects for api usage, other render logic

app.get('/scripts/main.js', (req, res) => {
  res.sendFile(path.join(appRoot, 'client','main-static.js'))
})


app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'snowflake-x',
    qrserved: qrData,
    qserved: qData
  })
})
// Error handler

// ERROR HANDLING

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); // Catch 404 and forward to error handler
}).use((err, req, res, next) => { // eslint-disable-line no-unused-vars 
  res
    .status(err.status || 500)
    .render('pages/error', {
      message: err.message // Error handler
    });
});

const server = app.listen(PORT, () => {
  console.log(`${app.locals.title} listening at port ${server.address().port}`);
});
