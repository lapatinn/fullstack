require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
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

const ErrorHandler = (error, request, response, next) => {
  console.log('\nFrom ErrorHandler:')
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }
  next(error)
}

app.get('/', (request, response) => {
  response.send('Welcome to tha backend')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const ppl = Person.find({}).then(persons => {
    const count = persons.length
    const date = new Date()
    response.send(`<p>Phonebook contains ${count} people.<p/> 
        <p>Accessed on: ${date}</p>`)
  })

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
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

  } else {
    return response.status(400).json({ error: 'Content missing' })
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  console.log('person to update', name, number)

  Person.findById(request.params.id)
  .then((person) => {
    if (!person) {
      return response.status(404).end()
    }

    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  })
  .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  console.log('\nFrom unknownEndpoint:')
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(ErrorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})