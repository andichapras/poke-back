const axios = require('axios')

const Pokemon = require('../models/pokemon-model.js')

const getMyPokemon = async (req, res, next) => {
    let myPokemon
    try {
        myPokemon = await Pokemon.find({})
    } catch (error) {
        console.log(error)
        return next(error)
    }
    res.json({myPokemon: myPokemon.map(p => p.toObject({ getters: true }))})
}

const getMyPokemonDetail = async (req, res, next) => {
    const pokeId = req.params.pokeid

    let pokemon
    try {
        pokemon = await Pokemon.findById(pokeId)
    } catch (error) {
        console.log(error)
        return next(error)
    }
     res.json({ pokemon: pokemon.toObject({ getters: true }) })
}

const fiboRename = (x) => {
    let fibo = [0,1]
    if(x===1) {
        return [0]
    } else if (x===2) {
        return [0,1]
    } else {
        for(i=2; i<=x; i++){
            const a=fibo[i-1] + fibo[i-2]
            fibo.push(a)
        }
        return(fibo)
    }
}

const renameMyPokemon = async (req, res, next) =>{
    const pokeId = req.params.pokeid

    let pokemon
    try {
        pokemon = await Pokemon.findById(pokeId)
        pokemon.rename+=1
        const fibo = fiboRename(pokemon.rename)
        const arrName = pokemon.name.split("-")
        pokemon.name = arrName[0]+"-"+fibo[pokemon.rename-1]
        
    } catch (error) {
        console.log(error)
        return next(error)
    }
    console.log(pokemon)

    try {
        await pokemon.save()
    } catch (error) {
        console.log(error)
        return next(error)
    }
    res.json({ pokemon: pokemon.toObject({ getters: true }) })
}

const probRelease = () => {
    const x = Math.floor(Math.random() *100) + 1
    let prima = true
    if(x === 2) {
        prima = true
    } else {
        for(i=2; i<x; i++) {
            if(x % i === 0) {
                prima = false
                break
            } else {
                prima = true
            }
        }
    }
    return(prima)
}

const releasePokemon = async (req, res, next) => {
    const pokeId = req.params.pokeid

    let pokemon
    const prob = probRelease()

    if(prob === true) {
        try {
            pokemon = await Pokemon.findById(pokeId)
        } catch (error) {
            console.log(error)
            return next(error)
        }
    
        try {
            await pokemon.remove()
        } catch (error) {
            console.log(error)
            return next(error)
        }
        res.json({ message: 'Pokemon has ben released' })
    } else {
        res.json({ message: 'Failed Release Pokemon' })
    }

    
}

exports.getMyPokemon = getMyPokemon
exports.getMyPokemonDetail = getMyPokemonDetail
exports.renameMyPokemon = renameMyPokemon
exports.releasePokemon = releasePokemon