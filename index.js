const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan') // remove for production
const PORT = process.env.PORT || 5000

const app = express();
// fixes
app.disable('x-powered-by')
// dev additions // should be conditined out for production
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))

  .use('/ioBIN', express.static(path.join(__dirname, 'ioBIN')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
// ejs or pug? pug is simpler but ejs is more real
// main app logic goes here, firebase,sockets,route objects for api usage, other render logic


let qRdata={
  "man": "bun",
  "env": "ENV",
  "port": "PORT",
  "boolTrue": "boolTrue",
  "boolFalse": "boolFalse",
  "fooBar": "globalObj.foo",
  "bazQux": "globalObj.baz",
  "nonExistant": "sausage.dogs.are.cool",
  "nonExistant2": "sausage"
}
let qData={
  "boolTrue": true,
  "boolFalse": false,
  "counter": 0,
  "jsonProp": "I am defined in the global data object so will take preference",
  "loop": [
    {
      "property": "Vue"
    },
    {
      "property": "JS"
    },
    {
      "property": "rules!"
    }
  ],
  "tags": [
    "js",
    "front-end",
    "framework"
  ],
  "author": {
    "firstName": "Matt",
    "lastName": "Stow"
  },
  "skills": [
    {
      "name": "JS",
      "level": 4
    },
    {
      "name": "CSS",
      "level": 5
    }
  ]
}
app.get('/scripts/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','main-static.js'))
})

  app.get('/', (req, res) => res.render('pages/index', {
      title: 'snowflake-x',
      qrserved: qRdata,
      qserved:qData
      // qrserved: JSON.stringify(qRdata),
      // qserved:JSON.stringify(qData)
    }))
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



  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
