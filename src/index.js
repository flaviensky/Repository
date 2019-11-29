const express = require('express')
const app = express()
const restaurantsRoute = require('./Routes/restaurants')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(restaurantsRoute)
app.use(express.static('public'))

app.use((req, res, next) => {
    res.status(404).send('Sorry, you are lost ! Flavien')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`Server started on port ${PORT}`))