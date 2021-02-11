require('dotenv').config();
const express = require('express'); 
const app = express();
const methodOverride = require('method-override');

///////MIDDLEWARE STARTS
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.static('public'));
//after app has been defined, use methodOverride. Allows the delete to work
app.use(methodOverride('_method'));
//near the top, around other app.use() calls; parsing data
app.use(express.urlencoded({ extended: true }));
////Controllers and Routes
app.use("/list", require("./controllers/listController"));
app.use("/users", require("./controllers/usersController"));

/////////MIDDLEWARE ENDS

//INDEX
app.get('/', (req, res) => {
    res.render('users/index.ejs')
});


app.listen(process.env.PORT, () => {
    console.log("I am listening");
  });