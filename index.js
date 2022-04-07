const http = require('http')

const express = require('express')

const app = express()

// 3.7: Phonebook backend step7


// 3.8: Phonebook backend step8


const morgan = require('morgan')

morgan.token('body', (req)=>JSON.stringify(req.body)) 

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' )) 

// 3.1: Phonebook backend step1/ step7


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
    
  
  app.get('/api/persons', morgan('tiny'),  (request, response) => {
    response.json(persons)
  })

  // 3.2: Phonebook backend step2

  app.get('/info', (request, response) => { 
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1> ${new Date()}`)
   })

  //  3.3: Phonebook backend step3

   app.get('/api/persons/5', (request, response) => {
    const id = Number(request.params.id)
       const person = persons.find(person => person.id === id)
       if (person){
      response.json(person)
       }
       else{
        response.status(404).end()
       }
  })

  // 3.4: Phonebook backend step4

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  // 3.5: Phonebook backend step5

  app.use(express.json())

  app.post('/api/persons', (request, response) => {
    const body = request.body 
    const person = {
        id: Math.floor(Math.random()*1000),
        name: body.name,
        number: body.number,
    }
// 3.6: Phonebook backend step6

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }
  
    if (!body.number) {
        return response.status(400).json({ 
          error: 'number is missing' 
        })
      }

    
    if (persons.map(person => person.name).includes(body.name)){
        return response.status(400).json({error:`name must be unique`})

    }
    console.log(persons)
    persons=persons.concat(person)
    response.json(persons)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
