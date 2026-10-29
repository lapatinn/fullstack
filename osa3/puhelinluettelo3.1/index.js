require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

// Morganilla on joku ongelma! Tulostaa kenoviivan aina ennen "-merkkiä!
// Tuhlasin varmaan tunnin korjaamiseen, mutta mikään vääntö ei auta olen Raivoissani
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

const unknownEndpoint = (request, response) => {
  console.log('\nFrom unknownEndpoint:')
  response.status(404).send({ error: 'unknown endpoint' })
}


const ErrorHandler = (error, request, response, next) => {
  console.log('\nFrom ErrorHandler:')
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }
  next(error)
}

app.get('/', (request, response) => {
  response.send('Hello frontpage')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`<p>Phonebook contains ${count} people.<p/> 
        <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
    response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      person.deleteOne().then(deletedPerson => {
        response.json(deletedPerson)
      })
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.use(unknownEndpoint)
app.use(ErrorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})