const express = require('express');
const router = express.Router();
const List = require('../models').List;
const User = require('../models').User;




router.get('/', (req, res) => {
    List.findAll(req.params.id) .then ((thisList) =>{
        User.findOne({
            where:{
                userId: req.params.id 
            }
        })
        res.render('index.ejs', {
            list: thisList,
            userId: req.params.userId,
            index: req.params.id
        })
    });
    
});

////Post New shopping list ITEM into table using sequelize
router.post('/', (req, res)=>{
    console.log(req.body);
    List.create(req.body).then((newItem) => {

    res.redirect("/list");
 });
});



router.delete("/:id", (req, res) => {
    List.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/list");
    });
});

module.exports = router;