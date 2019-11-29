const mongoose = require('mongoose')

const server = 'localhost:27017'
const database = 'masterclass_project'
const user = 'jarvis'
const password = 'jarvis'

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => {
    console.log(`Connected to database ${database}`)
})

const RestaurantsSchema = new mongoose.Schema({
    name: String,
    location: {
        type:{
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number, Number],
            required: true,
            index: "2dsphere"
        }
    }
})

module.exports = mongoose.model('Restaurants', RestaurantsSchema)