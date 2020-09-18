const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const  cors = require('cors')
const schema = require('./schema.js')

const app = express();

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(4000, () => console.log('listening...'));
 

/*,
    {
      "id": "4",
      "name": "Katie Naura",
      "email": "katie@gmail.com",
      "age": 24
    },
    {
      "id": "5",
      "name": "Jen Thompson",
      "email": "jen@gmail.com",
      "age": 22
    },
    {
      "name": "Harry White",
      "email": "harry@gmail.com",
      "age": 34,
      "id": "6"
    },
    {
      "name": "Animesh Samaiya",
      "email": "asamaiya",
      "age": 21,
      "id": "5NIJLTK"
    }*/
