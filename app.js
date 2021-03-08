var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twilioRouter = require('./routes/apiLogs.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/voicedb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}).catch(e => {
  console.log('haha',e);
})

 app.use('/twilioNumber',twilioRouter)


// var test=[
//   {name:"umer",id:"1"},
//   {name:"taimur",id:"1"},
//   {name:"ali",id:"2"},
//   {name:"safwan",id:"3"},
// ];
// app.use('/graphql',graphqlHttp.graphqlHTTP({
//   schema: buildSchema(`
//   type test {
//     name: String
//     id : String
//   }
//   type RootQuery {
//     events(params : String): [test!]! ,
  
//   }
//   input testinput {
//     name: String
//     id : String
//   }
//   type RootMutation {
//     createEvent(test : testinput): test
//   }
//   schema {
//     query: RootQuery
//     mutation: RootMutation
//   }`),
//   rootValue:{

//     events:(params)=>{
//       console.log('params: ', params);
//       console.log(test)
//       let data = test.filter(element => {
//           console.log('params:', params.params)
//           console.log('id:' , element.id)
//           return element.id === params.params
//       })
//       return data;
//     },
//     createEvent : (arg) => {

//       let a = { name: arg.test.name, id: arg.test.id}
//       test.push(a)
//       return a
//     }
//   },
//   graphiql:true

// }))


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
