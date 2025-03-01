require("./middlewares/index");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const livereload = require("livereload");
const { bundle } = require("./webpack");
var expressSession = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const agreementRouter = require("./routes/agreement");
const inputPhoneRouter = require("./routes/inputPhone");
const inputEmailRouter = require("./routes/inputEmail");
const apiRouter = require("./routes/api");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV === "dev"){
  const liveServer = livereload.createServer({
    exts: ["js", "css"],
  });  
  app.locals.env = process.env;
  bundle().then(_ => {
    liveServer.watch([ path.resolve("public/js"), path.resolve("public/css")]);
    liveServer.server.once("connection", () => {
      setTimeout(() => {
        liveServer.refresh("/");
      }, 100);
    });
  })
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: '2@ad!!da',
  resave: false,
  saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/inputPhone', inputPhoneRouter);
app.use('/inputEmail', inputEmailRouter);
app.use('/agreement', agreementRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
