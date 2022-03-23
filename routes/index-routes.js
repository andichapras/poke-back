const express = require('express')

const indexController = require('../controllers/index-controller')

const router = express.Router()

router.get('/', indexController.getAllPokemon)

router.get('/detail/:pokeid', indexController.getPokemonDetail)

router.post('/detail/:pokeid', indexController.catchPokemon)

module.exports = router