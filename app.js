
const  {flash}  = require('express-flash-message');
const session = require('express-session')
const methodOverride=require('method-override')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet")
const hpp = require('hpp');
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const router = require('./src/Routes/customer');

const app = express()


//sequrity middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(mongoSanitize());
app.use(helmet())
app.use(hpp());
//request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30000 // limit each IP to 100 requests per windowMs
});

app.use(limiter)


app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/Mern_User_App')
  //mongoose.connect("mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/CRUD")
  .then(() => {
    console.log('connected to db')
  })
  .catch((e) => {
    console.log(e)
  })





//introducing frontend to backend
//app.use(express.static("client/dist"))
app.use(express.static("public"))


//express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 7 //1 week
    }
  })
)


//flash message 
app.use(flash({ sessionKeyName: 'flashMessage' }));










   

 

//Templating Engine
app.use(expressLayout); 
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')


//Routing 
app.use('/', router)
 
//Home

// app.get('/', (req, res) => {
//   let locals = {
//     title: 'NodeJS',
//     description: 'Free NodeJs User Management System'
//   };
//   res.render('index', locals)
// })
 
//404 page
app.get('*', (req, res) => {
  let locals = {
    title: 'NodeJS',
    description: 'Free NodeJs User Management System'
  };
  res.render('404', locals)
})
 
 
// app.use("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
// })




//error handler here
function errorHandler(err, req, res, next) {
  console.log("err")
  res.status(500)
  res.render('error', { error: err })
}

app.use(errorHandler)



 



 





   











module.exports = app
