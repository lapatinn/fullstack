const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack_lauri:${password}@fullstackcluster.t4pilfv.mongodb.net/phonebook`

  mongoose.set('strictQuery', false)
  mongoose.connect(url, { family: 4 })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    console.log('\nPhonebook:')
    result.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const password = process.argv[2]
  const input_name = process.argv[3]
  const input_number = process.argv[4]
  const url = `mongodb+srv://fullstack_lauri:${password}@fullstackcluster.t4pilfv.mongodb.net/phonebook`

  mongoose.set('strictQuery', false)
  mongoose.connect(url, { family: 4 })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: input_name,
    number: input_number,
  })

  person.save().then(result => {
    console.log(`Person ${input_name} saved!`)
    mongoose.connection.close()
  })
}
