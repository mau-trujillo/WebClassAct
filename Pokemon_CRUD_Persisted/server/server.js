const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

const PORT = 3000
const pokemonsSaved = {}

app.use(express.json())
app.use(cors())

app.get('/getPokemon/:id', async (req, res) => {
    let name = "";
    let id = 0;
    if (req.params.id.replace(/[0-9]/g, '').trim())
        name = req.params.id.trim();
    else
        id = parseInt(req.params.id);

    if (id in pokemonsSaved || name in pokemonsSaved) {
        console.log("Info is in cache.")
    } else {
        console.log("Info is not in cache. Asking pokeapi...")

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name ? name : id}`)
            .then(({ data }) => {
                pokemonsSaved[data.id] = data
                pokemonsSaved[data.name] = data
            })
            .catch((err) => {
                console.error(err.response)
                return res.sendStatus(err.response.status)
            })
    }
    res.send(pokemonsSaved[name || id])
    console.log("Sent.")
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
