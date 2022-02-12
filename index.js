const mongoose = require('mongoose');
require('dotenv/config');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = process.env.MONGODB_URI;

// Connection to the database "recipe-app"

mongoose
.connect(MONGODB_URI)
.then(x => {

  console.log(`Connected to the database: "${x.connection.name}"`);
  Recipe.deleteMany()
  .then(()=>{
    
    Recipe.insertMany(data)
    .then((response)=>{

      console.log(response.map(el=>el.title));
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(() => {

        console.log('Rigatoni changed successfully!')
        Recipe.deleteOne({title: 'Carrot Cake'})
        .then(()=>{
          console.log('Carrot cake deleted :(');
          mongoose.connection.close();
        })
        .catch(error => console.log(error))

      })
      .catch(error => console.log(error))

    })
    .catch(error => console.log(error))

  })
  .catch(error => console.log(error))

})
.catch(error => {
  console.error('Error connecting to the database', error);
});