const express = require('express')

const indexController = require('../controllers/index-controller')

const router = express.Router()

router.get('/', indexController.getAllPokemon)

router.post('/:pokeid', indexController.catchPokemon)

module.exports = router