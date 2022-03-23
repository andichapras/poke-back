const axios = require('axios')
const mongoose = require('mongoose')

const Pokemon = require('../models/pokemon-model')

const getAllPokemon = async (req, res, next) => {
    let pokemons = []

    try {
        await axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then((response) => {
            
            data = response.data.results
            
            for(let i=0; i<data.length; i++) {
                const poke = {
                    "name": data[i].name,
                    "pic": (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`)
                }
                pokemons.push(poke)
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
    } catch (err) {
        console.log(error)
    }
  
    res.json({hasil : pokemons})
}

const getPokemonDetail = async (req, res, next) => {
    const pokeid = req.params.pokeid

    let pokemon = {}

    try {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
        .then((response) => {
            const moves = []
            response.data.moves.map(m=> {
                moves.push(m.move.name)
            })

            const types = []
            response.data.types.map(t=> {
                types.push(t.type.name)
            })

            pokemon = {
                "pokemon": pokeid,
                "types": types,
                "moves": moves
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    } catch (err) {
        console.log(error)
    }
    res.json({pokemon : pokemon})
}

const catchPokemon = async (req, res, next) => {
    const { nickname } = req.body
    const pokeId = req.params.pokeid

    const catchPokemon = new Pokemon({
        pokemon: pokeId,
        name: nickname
    })
    console.log(nickname)

    try {
        await catchPokemon.save()
    } catch (err) {
        console.log(error)
    }
    res.json({pokemon: catchPokemon})
}

exports.getAllPokemon = getAllPokemon
exports.getPokemonDetail = getPokemonDetail
exports.catchPokemon = catchPokemon
