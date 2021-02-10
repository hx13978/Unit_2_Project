const express = require("express");
const router = express.Router();

const User = require("../models").User;
const List = require("../models").List;

router.get('/', (req, res) => {
    res.render('users/index.ejs');
});

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

////Post New User into table using sequelize
router.post('/', (req, res)=>{
    User.create(req.body).then((newUser) => {
    res.redirect("/users/profile/" + newUser.id);
 });
});


router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

 router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id) .then((thisUser) =>{
    res.render("users/profile.ejs", {
        userInfo: thisUser, 
		index: req.params.id    
    })
    });
})


router.post('/login', (req, res)=>{
    User.findOne({
        where:{
            name:req.body.name,
            password:req.body.password
        }
    }) .then((thisUser)=>{
        res.redirect('/users/profile/'+ thisUser.id)
    })
});

router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((user) => {
        res.redirect("/users/profile/" + req.params.id);
    });
});


// Delete route to the User database using sequalize
router.delete("/:id", (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/users");
    });
});

module.exports = router;