const express = require('express')

const mineController = require('../controllers/mine-controller')

const router = express.Router()

router.get('/', mineController.getMyPokemon)

router.get('/:pokeid', mineController.getMyPokemonDetail)

router.patch('/:pokeid', mineController.renameMyPokemon)

router.delete('/:pokeid', mineController.releasePokemon)

module.exports = router