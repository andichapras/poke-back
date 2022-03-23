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
    } catch (error) {
        console.log(error)
    }
  
    res.json({hasil : pokemons})
}

const getPokemonDetail = async (req, res, next) => {
    const pokeId = req.params.pokeid

    let pokemon = {}

    try {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then((response) => {
            const moves = []
            response.data.moves.map(m=> {
                moves.push(m.move.name)
            })

            const types = []
            response.data.types.map(t=> {
                types.push(t.type.name)
            })

            const pic = response.data.sprites.front_default

            pokemon = {
                "pokemon": pokeId,
                "picture": pic,
                "types": types,
                "moves": moves
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    } catch (error) {
        console.log(error)
    }
    res.json({pokemon : pokemon})
}

const propCatchPokemon = () => {
    return Math.random() < 0.5
}

const catchPokemon = async (req, res, next) => {
    const { name } = req.body
    const pokeId = req.params.pokeid

    const prob = propCatchPokemon()
     if (prob === true) {
        const catchPokemon = new Pokemon({
            pokemon: pokeId,
            name,
            rename: 0
        })
    
        try {
            await catchPokemon.save()
        } catch (error) {
            console.log(error)
        }
        res.json({pokemon: catchPokemon})
     } else {
         res.json({ message: 'Sorry you failed to catch '+pokeId })
     }

    
}

exports.getAllPokemon = getAllPokemon
exports.getPokemonDetail = getPokemonDetail
exports.catchPokemon = catchPokemon
