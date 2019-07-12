require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
// const { body, validationResult, sanitizeBody } = require('express-validator')
const { getBestRate, createShipment } = require('./shipping')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/rates', async (req, res) => {
  try {
    const requiredFields = ['address_line_one', 'city', 'province', 'postalCode', 'country']
    const keys = Object.keys(req.body).filter(key => req.body[key])
    const isValidOperation = keys.length
      ? requiredFields.every(field => keys.includes(field))
      : false


    if (!isValidOperation) {
      throw new Error('Please fill out all the required fields')
    }

    const bestRate = await getBestRate(req.body.postalCode)

    if (!bestRate) {
      throw new Error('There are no shipping rates available for this location')
    }

    res.status(200).send({ bestRate })

    createShipment({ rate: bestRate, destination: req.body })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = app
