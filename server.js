const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const app = express();// getting-started.js

const kittySchema = new mongoose.Schema({
  name:String,
  email:String
})

const kitten = mongoose.model('Kitten',kittySchema)
main().then(res => console.log('db  connected',));
main().catch(err => console.log('db not connected',err));



async function main() {
  await mongoose.connect('mongodb://localhost:27017/photogram_database');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/login', (req, res) => {
  console.log(req.body,'reqreqreqreqreq');
  const { name,email }=  req.body
  kitten.create({name,email}).then((vel)=>{
    res.send('save data succesfully');
  }).catch((error)=>{
    res.send('data  not save');
  })

});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});