// Set up the express app
const express= require("express")
const app= express()
var quiz1 = require('./quiz1');
var cors = require('cors')
app.use(cors()) 
app.use('/quiz1', quiz1);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
