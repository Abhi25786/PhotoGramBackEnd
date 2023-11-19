if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}


const express = require('express')
const bodyParser = require('body-parser')

require('./src/config/database')
const mongoose = require("mongoose")

const app = express();// getting-started.js

const my_routes = require('./src/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',my_routes)

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});