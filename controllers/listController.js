const express = require('express');
const router = express.Router();
const List = require('../models').List;
const User = require('../models').User;




router.get('/new', (req, res) => {
    res.render('new.ejs');
});

////Post New shopping list ITEM into table using sequelize
router.post('/', (req, res)=>{
    console.log(req.body);
    List.create(req.body).then((newItem) => {

    res.redirect("/users/profile/"+ req.body.userId);
 });
});



router.delete("/:id", (req, res) => {
    List.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/list");
    });
});

module.exports = router;