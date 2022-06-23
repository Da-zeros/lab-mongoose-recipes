const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then((allElements)=>{
    allElements.forEach((element)=>{console.log(element.title)})
    
    return Recipe.create({
      "title":"Tortitas frescas",
      "level":"Amateur Chef",
      "ingredients":["oats", "soy Milk", "proteins", "eggs"],
      "cuisine":"propia",
      "dishType":"breakfast", 
      "duration":5,
      "creator":"SeMua",
    })
  })
  .then((newRecipe)=>{console.log(`New recipe ${newRecipe.title} added to the DB`)
    const query = { title: 'Rigatoni alla Genovese' };
    return Recipe.findOneAndUpdate(query,{duration:100},{new:true})

  })
  .then((updatedRecipe)=>{console.log(`${updatedRecipe.title} updated succesfuly`)
  return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then((deleteRes)=>{if(deleteRes.deletedCount ===1)console.log("Removed succesfully") 
  return  mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 