const express = require('express');
const router = express.Router();
const List = require('../models').List;
const User = require('../models').User;




router.get('/new', (req, res) => {
    res.render('new.ejs');
});




router.delete("/:id", (req, res) => {
    List.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/list");
    });
});

module.exports = router;