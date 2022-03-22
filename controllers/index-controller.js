const axios = require('axios')

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

const catchPokemon = (req, res, next) => {
    
}

exports.getAllPokemon = getAllPokemon
exports.catchPokemon = catchPokemon
