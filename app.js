const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'static')))

let user = {}

app.get("/", function(req, res, next){
  res.render("index")
})
app.post("/user/add", function(req,res,next){

  req.assert('name', 'Must contain more than two characters').len(2,100);
  req.assert('birthYear', 'Must be a valid date ').notEmpty().isInt();
  req.assert('email', 'valid email required').isEmail();
  req.assert('password', '8 to 20 characters are required').len(6, 20);

  req.getValidationResult().then(function(result) {

    if (result.isEmpty) {
      // no errors
      user.name = req.body.name
      user.email = req.body.email
      user.birthYear = req.body.birthYear
      user.position = req.body.position
      user.password = req.body.password
      res.redirect('/info')
    } else {
      // errors exist
      let errors = result.array()

    }
  })
})

app.get('/info', function(req, res, next){
  res.render("info", user)
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
