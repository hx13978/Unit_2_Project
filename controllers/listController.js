const express = require('express');
const router = express.Router();
const List = require('../models').List;
const User = require('../models').User;




router.get('/:id', (req, res) => {
    List.findAll({
        where: {
            userId: req.params.id,
        },
    }).then((thisList) => {
        console.log(req.params.id);
        res.render('index.ejs', {
            list: thisList,
            userId: req.params.id,
        })
    });
});   

////Post New shopping list ITEM into table using sequelize
router.post('/', (req, res)=>{
    console.log("console log  " + req.body);
    List.create(req.body).then((newItem) => {
    res.redirect("/list/" + req.body.userId);
 });
});

////Delete shopping list ITEM from table using sequelize
router.delete("/:listId/:userId", (req, res) => {
    List.destroy({ where: { id: req.params.listId } }).then(() => {
        res.redirect("/list/" + req.params.userId);
    });
});

module.exports = router;