require('./database/database-connector')
const express = require('express')
const bodyParser = require('body-parser')
const env = require('./server/props')
const cors = require('cors')
const cargoEntity = require('./entities/cargo-entity')
const funcionarioEntity = require('./entities/funcionario-entity')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

cargoEntity(app)
funcionarioEntity(app)

app.listen(env.SERVER_PORT,() => {
    console.log("server starting on port : " + env.SERVER_PORT)
})
